package com.lanlink.shopping.config;

import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.lanlink.shopping.entity.Role;
import com.lanlink.shopping.entity.User;
import com.lanlink.shopping.mapper.RoleMapper;
import com.lanlink.shopping.mapper.UserMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Objects;
import java.util.regex.Pattern;

/**
 * One-time, environment-controlled production bootstrap for the platform admin.
 *
 * Credentials are supplied only through the hosting platform's secret variables.
 * Existing accounts are never promoted, renamed, or have their passwords reset.
 * Disable the bootstrap switch after the account is created.
 */
@Component
@Profile("prod")
@Order(Ordered.HIGHEST_PRECEDENCE + 1)
public class PlatformAdminSeeder implements CommandLineRunner {
    private static final Logger log = LoggerFactory.getLogger(PlatformAdminSeeder.class);
    private static final Pattern PHONE_PATTERN = Pattern.compile("^1[3-9]\\d{9}$");
    private static final String ADMIN_ROLE_CODE = "admin";

    private final UserMapper userMapper;
    private final RoleMapper roleMapper;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.platform-admin.bootstrap.enabled:false}")
    private boolean enabled;

    @Value("${app.platform-admin.bootstrap.phone:}")
    private String phone;

    @Value("${app.platform-admin.bootstrap.password:}")
    private String password;

    @Value("${app.platform-admin.bootstrap.nickname:平台管理}")
    private String nickname;

    public PlatformAdminSeeder(UserMapper userMapper, RoleMapper roleMapper, PasswordEncoder passwordEncoder) {
        this.userMapper = userMapper;
        this.roleMapper = roleMapper;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (!enabled) {
            log.info("Platform admin bootstrap is disabled");
            return;
        }

        if (phone == null || !PHONE_PATTERN.matcher(phone).matches()) {
            throw new IllegalStateException("Platform admin bootstrap phone must be a valid mobile number");
        }
        if (password == null || password.length() < 20) {
            throw new IllegalStateException("Platform admin bootstrap password must contain at least 20 characters");
        }
        if (nickname == null || nickname.isBlank() || nickname.length() > 64) {
            throw new IllegalStateException("Platform admin bootstrap nickname must contain 1-64 characters");
        }

        Role adminRole = roleMapper.selectOne(
                Wrappers.<Role>lambdaQuery().eq(Role::getRoleCode, ADMIN_ROLE_CODE));
        if (adminRole == null) {
            throw new IllegalStateException("Required admin role is missing from t_role");
        }

        User existing = userMapper.selectOne(
                Wrappers.<User>lambdaQuery().eq(User::getPhone, phone));
        if (existing != null) {
            if (Objects.equals(existing.getRoleId(), adminRole.getRoleId())
                    && Objects.equals(existing.getNickname(), nickname)) {
                log.info("Platform admin bootstrap skipped; configured admin account already exists and its password was not changed");
            } else {
                log.error("Platform admin bootstrap refused: configured phone is already assigned to a different account; no account changes were made");
            }
            return;
        }

        LocalDateTime now = LocalDateTime.now();
        User admin = new User();
        admin.setPhone(phone);
        admin.setNickname(nickname);
        admin.setRoleId(adminRole.getRoleId());
        admin.setPassword(passwordEncoder.encode(password));
        admin.setCreateTime(now);
        admin.setUpdateTime(now);
        userMapper.insert(admin);

        log.info("Platform admin account created (role=admin, phone ending {}); disable APP_PLATFORM_ADMIN_BOOTSTRAP_ENABLED now",
                phone.substring(phone.length() - 4));
    }
}
