import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Card, Button, InputNumber, Input, Radio, Modal, message } from 'antd'
import { ArrowLeftOutlined, WalletOutlined, CheckCircleFilled } from '@ant-design/icons'
import { useStore } from '../store/storeContext'

const PRESET_AMOUNTS = [1000, 5000, 10000, 50000, 100000]

export const WalletRecharge: React.FC = () => {
  const navigate = useNavigate()
  const { walletBalance, rechargeWallet } = useStore()
  const [amount, setAmount] = useState<number>(10000)
  const [remark, setRemark] = useState('工程物资采购备用金在线充值')
  const [loading, setLoading] = useState(false)

  const handleRecharge = () => {
    if (!amount || amount <= 0) {
      message.warning('请输入有效的充值金额')
      return
    }
    setLoading(true)
    setTimeout(() => {
      rechargeWallet(amount, remark)
      setLoading(false)
      Modal.success({
        title: '充值成功',
        content: `成功向企业钱包充值 ¥${amount.toFixed(2)}，当前钱包可用余额已更新。`,
        okText: '查看我的钱包',
        onOk: () => navigate('/wallet')
      })
    }, 600)
  }

  return (
    <div className="main-container" style={{ maxWidth: '720px' }}>
      <div style={{ marginBottom: '20px' }}>
        <Link to="/wallet" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b' }}>
          <ArrowLeftOutlined /> 返回我的钱包
        </Link>
      </div>

      <Card style={{ borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 8px 30px rgba(0,0,0,0.04)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'rgba(30, 110, 184, 0.1)',
              display: 'grid',
              placeItems: 'center',
              color: 'var(--ll-primary)',
              fontSize: '22px'
            }}
          >
            <WalletOutlined />
          </div>
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: 800, margin: 0, color: 'var(--ll-navy)' }}>
              钱包在线充值
            </h1>
            <span style={{ fontSize: '13px', color: '#64748b' }}>
              当前钱包余额：<b>¥{walletBalance.toFixed(2)}</b>
            </span>
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: '10px', fontSize: '14px' }}>
            常用快捷充值金额
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {PRESET_AMOUNTS.map(p => (
              <Button
                key={p}
                size="large"
                type={amount === p ? 'primary' : 'default'}
                style={{
                  borderRadius: '10px',
                  fontWeight: 700,
                  height: '42px',
                  minWidth: '100px'
                }}
                onClick={() => setAmount(p)}
              >
                ¥{p.toLocaleString()}
              </Button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px', fontSize: '14px' }}>
            自定义充值金额 (元)
          </label>
          <InputNumber
            min={1}
            max={10000000}
            step={100}
            value={amount}
            onChange={v => setAmount(v || 0)}
            size="large"
            style={{ width: '100%', fontSize: '18px', fontWeight: 700 }}
            prefix="¥"
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px', fontSize: '14px' }}>
            充值备注说明
          </label>
          <Input
            value={remark}
            onChange={e => setRemark(e.target.value)}
            size="large"
            placeholder="例如：2号工地备用金"
          />
        </div>

        <div style={{ marginBottom: '32px' }}>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: '10px', fontSize: '14px' }}>
            支付渠道
          </label>
          <Radio.Group value="bank" style={{ width: '100%' }}>
            <div style={{ padding: '12px 16px', border: '1.5px solid var(--ll-primary)', borderRadius: '12px', background: 'rgba(30, 110, 184, 0.04)' }}>
              <Radio value="bank">
                <b>大宗对公银企直联 / 模拟即时扣款</b>
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                  演示环境免银行手续费，点击后即时到账入账
                </div>
              </Radio>
            </div>
          </Radio.Group>
        </div>

        <Button
          type="primary"
          size="large"
          block
          loading={loading}
          style={{
            height: '48px',
            fontSize: '16px',
            fontWeight: 700,
            background: 'linear-gradient(135deg, var(--ll-navy), var(--ll-primary))',
            border: 'none'
          }}
          onClick={handleRecharge}
        >
          确认充值 ¥{amount ? amount.toFixed(2) : '0.00'}
        </Button>
      </Card>
    </div>
  )
}
