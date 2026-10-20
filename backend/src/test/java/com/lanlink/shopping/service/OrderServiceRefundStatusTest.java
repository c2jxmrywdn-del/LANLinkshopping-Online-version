package com.lanlink.shopping.service;

import com.lanlink.shopping.entity.Order;
import com.lanlink.shopping.integration.pricing.PricingFacade;
import com.lanlink.shopping.mapper.CartMapper;
import com.lanlink.shopping.mapper.OrderItemMapper;
import com.lanlink.shopping.mapper.OrderMapper;
import com.lanlink.shopping.mapper.ProductMapper;
import com.lanlink.shopping.mapper.UserMapper;
import com.lanlink.shopping.module.membership.service.MembershipService;
import com.lanlink.shopping.service.CreditTermService;
import com.lanlink.shopping.service.IdentityService;
import com.lanlink.shopping.service.AuditService;
import com.lanlink.shopping.service.MessageService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.context.ApplicationEventPublisher;
import org.mockito.ArgumentCaptor;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class OrderServiceRefundStatusTest {
    private OrderMapper orderMapper;
    private OrderService service;

    @BeforeEach
    void setUp() {
        CartMapper cartMapper = mock(CartMapper.class);
        ProductMapper productMapper = mock(ProductMapper.class);
        orderMapper = mock(OrderMapper.class);
        OrderItemMapper orderItemMapper = mock(OrderItemMapper.class);
        UserMapper userMapper = mock(UserMapper.class);
        MessageService messageService = mock(MessageService.class);
        IdentityService identityService = mock(IdentityService.class);
        AuditService auditService = mock(AuditService.class);
        PricingFacade pricingFacade = mock(PricingFacade.class);
        ApplicationEventPublisher eventPublisher = mock(ApplicationEventPublisher.class);
        MembershipService membershipService = mock(MembershipService.class);
        CreditTermService creditTermService = mock(CreditTermService.class);

        service = new OrderService(cartMapper, productMapper, orderMapper, orderItemMapper, userMapper,
                messageService, identityService, auditService, pricingFacade, eventPublisher,
                membershipService, creditTermService);
    }

    private Order order() {
        Order order = new Order();
        order.setOrderNo("ORD-REFUND-1");
        order.setTotalAmount(new BigDecimal("100.00"));
        order.setRefundAmount(BigDecimal.ZERO);
        order.setRefundStatus("none");
        return order;
    }

    private Order updatedOrder(BigDecimal cumulativeRefund, boolean succeeded) {
        Order order = order();
        when(orderMapper.selectById("ORD-REFUND-1")).thenReturn(order);
        service.applyRefundResult("ORD-REFUND-1", "REF-1", cumulativeRefund, succeeded);
        ArgumentCaptor<Order> captor = ArgumentCaptor.forClass(Order.class);
        verify(orderMapper).updateById(captor.capture());
        return captor.getValue();
    }

    @Test
    void partialRefundMustRemainEligibleForAnotherRefund() {
        Order updated = updatedOrder(new BigDecimal("25.00"), true);
        assertEquals("partial", updated.getRefundStatus());
    }

    @Test
    void fullRefundUsesSuccessState() {
        Order updated = updatedOrder(new BigDecimal("100.00"), true);
        assertEquals("success", updated.getRefundStatus());
    }

    @Test
    void unsuccessfulRefundRemainsProcessing() {
        Order updated = updatedOrder(BigDecimal.ZERO, false);
        assertEquals("processing", updated.getRefundStatus());
    }
}
