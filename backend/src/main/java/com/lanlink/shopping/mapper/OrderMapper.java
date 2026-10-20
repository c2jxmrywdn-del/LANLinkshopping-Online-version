package com.lanlink.shopping.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.lanlink.shopping.entity.Order;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.math.BigDecimal;

public interface OrderMapper extends BaseMapper<Order> {

    /** 用户累计已支付订单金额（pay_status=1） */
    @Select("SELECT COALESCE(SUM(total_amount), 0) FROM t_order " +
            "WHERE user_id = #{userId} AND pay_status = 1")
    BigDecimal sumPaidAmount(@Param("userId") Long userId);

    /** Atomic order lifecycle transition; only paid orders may advance. */
    @Update("UPDATE t_order SET order_status = #{nextStatus}, update_time = CURRENT_TIMESTAMP " +
            "WHERE order_no = #{orderNo} AND order_status = #{expectedStatus} AND pay_status = 1")
    int transitionOrderStatus(@Param("orderNo") String orderNo,
                              @Param("expectedStatus") Integer expectedStatus,
                              @Param("nextStatus") Integer nextStatus);
}
