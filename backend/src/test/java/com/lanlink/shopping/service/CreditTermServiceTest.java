package com.lanlink.shopping.service;

import com.lanlink.shopping.common.BusinessException;
import com.lanlink.shopping.entity.CreditAccount;
import com.lanlink.shopping.mapper.CreditAccountMapper;
import com.lanlink.shopping.mapper.CreditBillMapper;
import com.lanlink.shopping.mapper.CreditRepaymentMapper;
import com.lanlink.shopping.mapper.UserMapper;
import com.lanlink.shopping.payment.wallet.service.WalletService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.context.ApplicationEventPublisher;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class CreditTermServiceTest {
    private CreditAccountMapper accountMapper;
    private CreditBillMapper billMapper;
    private WalletService walletService;
    private CreditTermService service;

    @BeforeEach
    void setUp() {
        accountMapper = mock(CreditAccountMapper.class);
        billMapper = mock(CreditBillMapper.class);
        CreditRepaymentMapper repaymentMapper = mock(CreditRepaymentMapper.class);
        UserMapper userMapper = mock(UserMapper.class);
        MessageService messageService = mock(MessageService.class);
        ApplicationEventPublisher eventPublisher = mock(ApplicationEventPublisher.class);
        walletService = mock(WalletService.class);
        service = new CreditTermService(accountMapper, billMapper, repaymentMapper, userMapper,
                messageService, eventPublisher, walletService);
    }

    @Test
    void transferCannotSettleBillWithoutCollectionVerification() {
        assertThrows(BusinessException.class,
                () -> service.repay(7L, 11L, new BigDecimal("50.00"), "transfer"));
        verifyNoInteractions(billMapper, walletService);
    }

    @Test
    void activeCreditAccountCannotBeReviewedAgain() {
        CreditAccount active = new CreditAccount();
        active.setId(12L);
        active.setStatus("ACTIVE");
        when(accountMapper.selectById(12L)).thenReturn(active);

        assertThrows(BusinessException.class,
                () -> service.review(12L, "REJECTED", null, null, "test"));
        verify(accountMapper, never()).updateById(any(CreditAccount.class));
    }
}
