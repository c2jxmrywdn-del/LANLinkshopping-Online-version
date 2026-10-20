package com.lanlink.shopping.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.lanlink.shopping.entity.Product;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Update;

public interface ProductMapper extends BaseMapper<Product> {

    /**
     * Atomically reserve stock for a checkout. The conditional UPDATE prevents
     * concurrent checkouts from overselling the same product.
     */
    @Update("UPDATE t_product " +
            "SET stock = COALESCE(stock, 0) - #{quantity}, " +
            "sales = COALESCE(sales, 0) + #{quantity}, " +
            "update_time = CURRENT_TIMESTAMP " +
            "WHERE prod_id = #{prodId} AND status = 1 " +
            "AND (deleted IS NULL OR deleted = 0) " +
            "AND #{quantity} > 0 AND COALESCE(stock, 0) >= #{quantity}")
    int reserveStock(@Param("prodId") Long prodId, @Param("quantity") Integer quantity);

    /**
     * Atomically release inventory and reverse sales after cancellation/refund.
     * Uses arithmetic in SQL to avoid lost updates under concurrent operations.
     */
    @Update("UPDATE t_product " +
            "SET stock = COALESCE(stock, 0) + #{quantity}, " +
            "sales = GREATEST(0, COALESCE(sales, 0) - #{quantity}), " +
            "update_time = CURRENT_TIMESTAMP " +
            "WHERE prod_id = #{prodId} AND (deleted IS NULL OR deleted = 0) " +
            "AND #{quantity} > 0")
    int restoreStock(@Param("prodId") Long prodId, @Param("quantity") Integer quantity);
}
