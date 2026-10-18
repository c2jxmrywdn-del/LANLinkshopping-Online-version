import React, { useState, useMemo } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Input, Select, Row, Col, Button, Pagination, Empty, message, Card } from 'antd'
import { SearchOutlined, ShoppingCartOutlined, FireOutlined } from '@ant-design/icons'
import { useStore } from '../store/storeContext'
import { InteractiveProductCard } from '../components/InteractiveProductCard'

export const Mall: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const { products, industries, categories, promotions, user, addToCart } = useStore()

  const keyword = searchParams.get('keyword') || ''
  const indIdParam = searchParams.get('indId') ? Number(searchParams.get('indId')) : undefined
  const catIdParam = searchParams.get('catId') ? Number(searchParams.get('catId')) : undefined
  const sortParam = searchParams.get('sort') || ''

  const [searchInput, setSearchInput] = useState(keyword)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 8

  const isVip = user?.identity?.code === 'vip'

  const filteredCategories = useMemo(() => {
    if (!indIdParam) return categories
    return categories.filter(c => c.indId === indIdParam)
  }, [categories, indIdParam])

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      if (p.status !== 1) return false
      if (keyword && !p.title.toLowerCase().includes(keyword.toLowerCase()) && !p.brand.toLowerCase().includes(keyword.toLowerCase())) {
        return false
      }
      if (indIdParam && p.indId !== indIdParam) return false
      if (catIdParam && p.catId !== catIdParam) return false
      return true
    }).sort((a, b) => {
      if (sortParam === 'sales') return b.sales - a.sales
      if (sortParam === 'priceAsc') return a.price - b.price
      if (sortParam === 'priceDesc') return b.price - a.price
      return 0
    })
  }, [products, keyword, indIdParam, catIdParam, sortParam])

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredProducts.slice(start, start + pageSize)
  }, [filteredProducts, currentPage])

  const updateParam = (key: string, val: string | number | undefined) => {
    const next = new URLSearchParams(searchParams)
    if (val === undefined || val === '') {
      next.delete(key)
    } else {
      next.set(key, String(val))
    }
    setSearchParams(next)
    setCurrentPage(1)
  }

  const handleAddToCart = (e: React.MouseEvent, prodId: number) => {
    e.stopPropagation()
    if (!user) {
      message.warning('请先登录')
      navigate('/login')
      return
    }
    addToCart(prodId, 1)
    message.success('已加入购物车')
  }

  return (
    <div className="main-container">
      {/* Active Promotions Bar */}
      {promotions.length > 0 && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 18px',
            borderRadius: '14px',
            background: 'linear-gradient(90deg, #fef2f2, #fff1f2)',
            border: '1px solid #fecdd3',
            marginBottom: '20px',
            overflowX: 'auto'
          }}
        >
          <span style={{ color: '#e11d48', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <FireOutlined /> 促销进行中
          </span>
          {promotions.map(p => (
            <span
              key={p.promoId}
              style={{
                fontSize: '12px',
                background: '#fff',
                padding: '4px 10px',
                borderRadius: '6px',
                border: '1px solid #fda4af',
                color: '#9f1239'
              }}
            >
              {p.title}
            </span>
          ))}
        </div>
      )}

      {/* Filter and Search Toolbar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '14px',
          background: '#fff',
          padding: '16px 20px',
          borderRadius: '16px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
          marginBottom: '24px'
        }}
      >
        <Input.Search
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          onSearch={val => updateParam('keyword', val)}
          placeholder="搜索商品名称 / 品牌"
          style={{ width: '280px' }}
          allowClear
          enterButton={<SearchOutlined />}
        />

        <Select
          value={indIdParam}
          placeholder="全部行业"
          style={{ width: '160px' }}
          allowClear
          onChange={val => {
            updateParam('indId', val)
            updateParam('catId', undefined)
          }}
          options={[
            { label: '全部行业', value: undefined },
            ...industries.map(i => ({ label: i.name, value: i.indId }))
          ]}
        />

        <Select
          value={catIdParam}
          placeholder="全部品类"
          style={{ width: '160px' }}
          allowClear
          disabled={!indIdParam}
          onChange={val => updateParam('catId', val)}
          options={[
            { label: '全部品类', value: undefined },
            ...filteredCategories.map(c => ({ label: c.name, value: c.catId }))
          ]}
        />

        <Select
          value={sortParam || undefined}
          placeholder="综合排序"
          style={{ width: '150px' }}
          allowClear
          onChange={val => updateParam('sort', val)}
          options={[
            { label: '综合排序', value: '' },
            { label: '销量优先', value: 'sales' },
            { label: '价格升序', value: 'priceAsc' },
            { label: '价格降序', value: 'priceDesc' }
          ]}
        />

        <div style={{ marginLeft: 'auto', color: 'var(--ll-muted)', fontSize: '13px' }}>
          共找到 <b>{filteredProducts.length}</b> 款商品
        </div>
      </div>

      {/* Products Grid */}
      {paginatedProducts.length > 0 ? (
        <Row gutter={[20, 24]}>
          {paginatedProducts.map(p => (
            <Col key={p.prodId} xs={24} sm={12} md={6}>
              <InteractiveProductCard
                imageUrl={p.coverUrl}
                title={p.title}
                description={p.brand || 'B2B 供应商精选'}
                price={`¥${p.price.toFixed(2)}`}
                onClick={() => navigate(`/product/${p.prodId}`)}
                footer={
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(255,255,255,0.85)', fontSize: '12px' }}>
                      <span>销量 {p.sales}</span>
                      <span>现货 {p.stock}</span>
                    </div>

                    {isVip && (
                      <div style={{ color: 'var(--ll-brand-gold-soft)', fontSize: '12px', fontWeight: 700 }}>
                        VIP 专享价 ¥{(p.price * 0.95).toFixed(2)}
                      </div>
                    )}

                    <Button
                      type="primary"
                      size="small"
                      block
                      className="ll-add-cart"
                      icon={<ShoppingCartOutlined />}
                      onClick={e => handleAddToCart(e, p.prodId)}
                    >
                      加入购物车
                    </Button>
                  </div>
                }
              />
            </Col>
          ))}
        </Row>
      ) : (
        <Card style={{ textAlign: 'center', padding: '60px 0', borderRadius: '16px' }}>
          <Empty description="暂无符合条件的商品" />
          <Button type="primary" style={{ marginTop: '16px' }} onClick={() => setSearchParams({})}>
            重置筛选条件
          </Button>
        </Card>
      )}

      {/* Pagination */}
      {filteredProducts.length > pageSize && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '36px' }}>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={filteredProducts.length}
            onChange={p => setCurrentPage(p)}
          />
        </div>
      )}
    </div>
  )
}
