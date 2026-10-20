package com.lanlink.shopping.payment.service;

import com.lanlink.shopping.common.BusinessException;
import com.lanlink.shopping.payment.wallet.entity.WalletLog;
import com.lanlink.shopping.payment.wallet.service.WalletService;
import com.lanlink.shopping.service.OrderService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

/**
 * Separate Spring bean so the transaction boundary is applied through the proxy.
 * Wallet debit, order settlement, and returned balance must commit or roll back together.
 */
@Service
public class WalletPaymentCoordinator {
    private final WalletService walletService;
    private final OrderService orderService;

    public WalletPaymentCoordinator(WalletService walletService, OrderService orderService) {
        this.walletService = walletService;
        this.orderService = orderService;
    }

    @Transactional
    public Map<String, Object> pay(String orderNo, Long userId, BigDecimal amount) {
        WalletLog walletLog = walletService.payFromWallet(userId, amount, orderNo);
        boolean settled = orderService.settlePaid(orderNo, "wallet", "W" + walletLog.getId());
        if (!settled) {
            throw new BusinessException("订单已支付，钱包扣款已撤销");
        }

        Map<String, Object> result = new HashMap<>();
        result.put("paid", true);
        result.put("balance", walletService.balanceOf(userId));
        return result;
    }
}
