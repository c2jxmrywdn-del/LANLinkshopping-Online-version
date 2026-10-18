import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, Table, Tag, Button, Modal, message, Empty } from 'antd'
import { ArrowLeftOutlined, WalletOutlined } from '@ant-design/icons'
import { useStore } from '../store/storeContext'
import { CreditBill } from '../types'

export const CreditTermBills: React.FC = () => {
  const navigate = useNavigate()
  const { creditBills, repayCreditBill, walletBalance } = useStore()
  const [repayBill, setRepayBill] = useState<CreditBill | null>(null)
  const [repaying, setRepaying] = useState(false)

  const handleRepay = async () => {
    if (!repayBill) return
    const remaining = repayBill.amount - repayBill.repaidAmount
    if (walletBalance < remaining) {
      message.error('钱包余额不足以完成账单全额结清，请先前往钱包充值')
      return
    }

    setRepaying(true)
    try {
      repayCreditBill(repayBill.billId, remaining, 'wallet')
      message.success(`账单 #${repayBill.billId} 已成功结清！可用授信已即时恢复。`)
      setRepayBill(null)
    } catch (err: any) {
      message.error(err.message || '还款失败')
    } finally {
      setRepaying(false)
    }
  }

  const columns = [
    {
      title: '账单号 / 关联订单',
      key: 'billNo',
      render: (_: any, r: CreditBill) => (
        <div>
          <b>#{r.billId}</b>
          <div style={{ color: '#64748b', fontSize: '12px' }}>订单号：{r.orderNo}</div>
        </div>
      )
    },
    {
      title: '账单金额',
      dataIndex: 'amount',
      key: 'amount',
      render: (v: number) => <b style={{ color: '#e11d48', fontSize: '15px' }}>¥{v.toFixed(2)}</b>
    },
    {
      title: '已还金额',
      dataIndex: 'repaidAmount',
      key: 'repaid',
      render: (v: number) => <span style={{ color: '#10b981' }}>¥{v.toFixed(2)}</span>
    },
    {
      title: '应还剩余',
      key: 'remain',
      render: (_: any, r: CreditBill) => (
        <b style={{ color: r.status === 'PAID' ? '#10b981' : '#e11d48' }}>
          ¥{(r.amount - r.repaidAmount).toFixed(2)}
        </b>
      )
    },
    {
      title: '状态',
      key: 'status',
      render: (_: any, r: CreditBill) => {
        if (r.status === 'PAID') return <Tag color="green">已全额结清</Tag>
        if (r.status === 'OVERDUE') return <Tag color="red">已逾期</Tag>
        return <Tag color="orange">待还款</Tag>
      }
    },
    {
      title: '到期应还日',
      dataIndex: 'dueDate',
      key: 'due',
      render: (v: string) => <span style={{ color: '#64748b', fontSize: '13px' }}>{v}</span>
    },
    {
      title: '操作',
      key: 'op',
      render: (_: any, r: CreditBill) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            type="link"
            size="small"
            onClick={() => navigate(`/credit-term/bills/${r.billId}`)}
          >
            明细
          </Button>

          {r.status !== 'PAID' && (
            <Button
              type="primary"
              size="small"
              onClick={() => setRepayBill(r)}
            >
              还款
            </Button>
          )}
        </div>
      )
    }
  ]

  return (
    <div className="main-container">
      <div style={{ marginBottom: '20px' }}>
        <Link to="/credit-term" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b' }}>
          <ArrowLeftOutlined /> 返回账期中心
        </Link>
      </div>

      <Card style={{ borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 8px 24px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 800, margin: 0, color: 'var(--ll-navy)' }}>
              应付账期账单列表
            </h1>
            <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '13px' }}>
              支持查看每笔账单占用额度与还款记录，还款后授信额度即刻恢复。
            </p>
          </div>

          <Button type="primary" onClick={() => navigate('/wallet/recharge')}>
            充值钱包备用金
          </Button>
        </div>

        {creditBills.length > 0 ? (
          <Table
            dataSource={creditBills}
            columns={columns}
            rowKey="billId"
            pagination={{ pageSize: 8 }}
          />
        ) : (
          <Empty description="暂无企业账单" style={{ padding: '40px 0' }} />
        )}
      </Card>

      {/* Repay Modal */}
      {repayBill && (
        <Modal
          open={!!repayBill}
          title={`账期账单还款 · #${repayBill.billId}`}
          onCancel={() => setRepayBill(null)}
          onOk={handleRepay}
          confirmLoading={repaying}
          okText="确认还款"
          cancelText="取消"
        >
          <div style={{ padding: '16px 0', textAlign: 'center' }}>
            <div style={{ color: '#64748b', fontSize: '13px' }}>待还金额</div>
            <div style={{ fontSize: '32px', fontWeight: 800, color: '#e11d48', margin: '4px 0 16px' }}>
              ¥{(repayBill.amount - repayBill.repaidAmount).toFixed(2)}
            </div>

            <div
              style={{
                background: '#f8fafc',
                padding: '12px 16px',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                textAlign: 'left',
                fontSize: '13px'
              }}
            >
              <div>关联订单：<b>{repayBill.orderNo}</b></div>
              <div>还款方式：<b>企业钱包余额支付</b></div>
              <div style={{ marginTop: '4px' }}>
                钱包可用余额：
                <b style={{ color: walletBalance >= (repayBill.amount - repayBill.repaidAmount) ? '#10b981' : '#e11d48' }}>
                  ¥{walletBalance.toFixed(2)}
                </b>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
