import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Table, Checkbox, InputNumber, Button, Empty, Popconfirm, message } from 'antd'
import { DeleteOutlined, ShoppingCartOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { useStore } from '../store/storeContext'

export const Cart: React.FC = () => {
  const navigate = useNavigate()
  const { cart, updateCartQty, toggleCartChecked, toggleAllChecked, removeCartItem } = useStore()

  const checkedItems = cart.filter(i => i.checked)
  const allChecked = cart.length > 0 && checkedItems.length === cart.length
  const indeterminate = checkedItems.length > 0 && !allChecked

  const totalAmount = checkedItems.reduce((sum, item) => sum + item.subtotal, 0)

  const handleRemoveChecked = () => {
    checkedItems.forEach(i => removeCartItem(i.cartId))
    message.success('已删除选中的商品')
  }

  const columns = [
    {
      title: (
        <Checkbox
          checked={allChecked}
          indeterminate={indeterminate}
          onChange={e => toggleAllChecked(e.target.checked)}
        />
      ),
      key: 'check',
      width: 50,
      render: (_: any, record: any) => (
        <Checkbox
          checked={Boolean(record.checked)}
          onChange={e => toggleCartChecked(record.cartId, e.target.checked)}
        />
      )
    },
    {
      title: '商品信息',
      key: 'prod',
      render: (_: any, record: any) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }} onClick={() => navigate(`/product/${record.prodId}`)}>
          <img
            src={record.coverUrl}
            alt=""
            style={{ width: '64px', height: '64px', borderRadius: '8px', objectFit: 'cover' }}
          />
          <div>
            <div style={{ fontWeight: 600, color: 'var(--ll-navy)', fontSize: '14px' }}>
              {record.title}
            </div>
            <div style={{ color: '#64748b', fontSize: '12px', marginTop: '2px' }}>
              现货储备充足
            </div>
          </div>
        </div>
      )
    },
    {
      title: '单价',
      dataIndex: 'price',
      key: 'price',
      width: 140,
      render: (val: number) => <span style={{ fontWeight: 600 }}>¥{val.toFixed(2)}</span>
    },
    {
      title: '数量',
      key: 'qty',
      width: 160,
      render: (_: any, record: any) => (
        <InputNumber
          min={1}
          max={record.stock}
          value={record.quantity}
          onChange={v => updateCartQty(record.cartId, v || 1)}
        />
      )
    },
    {
      title: '小计',
      dataIndex: 'subtotal',
      key: 'subtotal',
      width: 140,
      render: (val: number) => <b style={{ color: '#e11d48', fontSize: '15px' }}>¥{val.toFixed(2)}</b>
    },
    {
      title: '操作',
      key: 'op',
      width: 90,
      render: (_: any, record: any) => (
        <Popconfirm
          title="确定从购物车移除这件商品？"
          okText="移除"
          cancelText="取消"
          onConfirm={() => removeCartItem(record.cartId)}
        >
          <Button type="text" danger icon={<DeleteOutlined />} />
        </Popconfirm>
      )
    }
  ]

  return (
    <div className="main-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div>
          <div style={{ fontSize: '11px', letterSpacing: '0.14em', color: 'var(--ll-primary)' }}>
            CART / CHECKOUT
          </div>
          <h1 style={{ fontSize: '26px', fontWeight: 800, margin: '4px 0', color: 'var(--ll-navy)' }}>
            我的购物车
          </h1>
          <p style={{ margin: 0, color: 'var(--ll-muted)', fontSize: '14px' }}>
            勾选需要采购结算的商品，系统将合并生成集中采购订单。
          </p>
        </div>

        <Button onClick={() => navigate('/mall')}>继续选购商品</Button>
      </div>

      {cart.length > 0 ? (
        <Card style={{ borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 8px 24px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Checkbox
                checked={allChecked}
                indeterminate={indeterminate}
                onChange={e => toggleAllChecked(e.target.checked)}
              >
                全选
              </Checkbox>
              <span style={{ color: '#64748b', fontSize: '13px' }}>
                已选 <b>{checkedItems.length}</b> / {cart.length} 件
              </span>
            </div>

            <Button
              type="link"
              danger
              disabled={checkedItems.length === 0}
              onClick={handleRemoveChecked}
            >
              删除已选商品
            </Button>
          </div>

          <Table
            dataSource={cart}
            columns={columns}
            rowKey="cartId"
            pagination={false}
          />

          {/* Checkout Bar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '24px',
              paddingTop: '20px',
              borderTop: '1px solid #f1f5f9'
            }}
          >
            <div>
              <span style={{ color: '#64748b', fontSize: '13px' }}>
                已选 <b>{checkedItems.length}</b> 件商品
              </span>
              <div style={{ color: '#94a3b8', fontSize: '12px', marginTop: '2px' }}>
                提示：仅勾选的商品才会进入下一页结算流程
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div>
                <span style={{ fontSize: '14px', color: '#64748b' }}>合计金额：</span>
                <span style={{ fontSize: '26px', fontWeight: 800, color: '#e11d48', marginLeft: '6px' }}>
                  ¥{totalAmount.toFixed(2)}
                </span>
              </div>

              <Button
                type="primary"
                size="large"
                disabled={checkedItems.length === 0}
                icon={<ArrowRightOutlined />}
                style={{
                  height: '46px',
                  padding: '0 28px',
                  fontSize: '15px',
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, var(--ll-navy), var(--ll-primary))',
                  border: 'none'
                }}
                onClick={() => navigate('/checkout')}
              >
                去结算
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <Card style={{ textAlign: 'center', padding: '60px 0', borderRadius: '20px' }}>
          <Empty
            image={<ShoppingCartOutlined style={{ fontSize: '64px', color: '#cbd5e1' }} />}
            description="购物车暂无商品，快去商城挑选优质货品吧"
          />
          <Button type="primary" size="large" style={{ marginTop: '16px' }} onClick={() => navigate('/mall')}>
            前往商城挑选
          </Button>
        </Card>
      )}
    </div>
  )
}
