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
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

/**
 * Optional, isolated demo-account seed. Demo credentials are separate from the
 * well-known legacy fixture accounts and public demo sessions are read-only.
 */
@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class DemoAccountSeeder implements CommandLineRunner {
    private static final Logger log = LoggerFactory.getLogger(DemoAccountSeeder.class);
    public static final String DEMO_PASSWORD = "Demo123!";

    private static final List<DemoAccount> ACCOUNTS = List.of(
            new DemoAccount("18800000991", "采购方演示账号", "buyer"),
            new DemoAccount("18800000992", "商户演示账号", "merchant")
    );

    private final UserMapper userMapper;
    private final RoleMapper roleMapper;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.demo.accounts.enabled:false}")
    private boolean enabled;

    public DemoAccountSeeder(UserMapper userMapper, RoleMapper roleMapper, PasswordEncoder passwordEncoder) {
        this.userMapper = userMapper;
        this.roleMapper = roleMapper;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (!enabled) {
            log.info("Public read-only demo accounts are disabled");
            return;
        }
        for (DemoAccount account : ACCOUNTS) {
            ensureAccount(account);
        }
    }

    private void ensureAccount(DemoAccount account) {
        Role role = roleMapper.selectOne(
                Wrappers.<Role>lambdaQuery().eq(Role::getRoleCode, account.roleCode()));
        if (role == null) {
            throw new IllegalStateException("Missing role needed for demo account: " + account.roleCode());
        }

        User existing = userMapper.selectOne(
                Wrappers.<User>lambdaQuery().eq(User::getPhone, account.phone()));
        if (existing != null && !isDemoUser(existing)) {
            log.warn("Demo account seed skipped because its phone is already assigned to another account (role={})",
                    account.roleCode());
            return;
        }

        LocalDateTime now = LocalDateTime.now();
        if (existing == null) {
            User user = new User();
            user.setPhone(account.phone());
            user.setNickname(account.nickname());
            user.setRoleId(role.getRoleId());
            user.setPassword(passwordEncoder.encode(DEMO_PASSWORD));
            user.setCreateTime(now);
            user.setUpdateTime(now);
            userMapper.insert(user);
            log.info("Created public read-only demo account (role={})", account.roleCode());
            return;
        }

        boolean changed = false;
        if (!Objects.equals(existing.getRoleId(), role.getRoleId())) {
            existing.setRoleId(role.getRoleId());
            changed = true;
        }
        if (!passwordEncoder.matches(DEMO_PASSWORD, existing.getPassword())) {
            existing.setPassword(passwordEncoder.encode(DEMO_PASSWORD));
            changed = true;
        }
        if (changed) {
            existing.setUpdateTime(now);
            userMapper.updateById(existing);
        }
        log.info("Public read-only demo account is ready (role={})", account.roleCode());
    }

    public static boolean isDemoUser(User user) {
        if (user == null) return false;
        return ACCOUNTS.stream().anyMatch(account ->
                account.phone().equals(user.getPhone()) && account.nickname().equals(user.getNickname()));
    }

    private record DemoAccount(String phone, String nickname, String roleCode) {
    }
}
