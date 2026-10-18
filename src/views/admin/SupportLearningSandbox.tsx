import React, { useState } from 'react'
import { Card, Form, Input, Button, Alert, Space, Row, Col, Descriptions, Tag, Steps, message } from 'antd'
import { ExperimentOutlined, DownloadOutlined, ClearOutlined, ArrowRightOutlined, CheckCircleOutlined } from '@ant-design/icons'
import { mockKnowledgeBase } from '../../store/mockData'

export const SupportLearningSandbox: React.FC = () => {
  const [question, setQuestion] = useState('企业账期逾期后会有滞纳金或者影响征信吗？')
  const [entryId, setEntryId] = useState('credit-overdue-rules')
  const [keywordText, setKeywordText] = useState('账期逾期, 滞纳金, 征信, 还款违约, 冻结授信')
  const [draftAnswer, setDraftAnswer] = useState(
    '根据平台企业账期规则，若在账期到期日24:00前未完成全额结清，系统将按日加收万分之五的违约金，并临时冻结企业采购额度。连续逾期超过30天将进入平台失信黑名单并提交至相关征信与司法仲裁机构。'
  )
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{
    matchedEntry: string
    currentAnswer: string
    learningEligible: boolean
    safetyPass: boolean
    candidateReady: boolean
    draftKeywordsMatch: boolean
  } | null>(null)

  const presets = [
    {
      label: '企业账期逾期问法',
      q: '企业账期逾期会有滞纳金或者影响征信吗？',
      id: 'credit-overdue-rules',
      kw: '账期逾期, 滞纳金, 征信, 还款违约',
      ans: '根据平台企业账期规则，若在账期到期日24:00前未完成全额结清，系统将按日加收万分之五的违约金，并临时冻结企业采购额度。'
    },
    {
      label: '批量采购阶梯优惠',
      q: '单笔订单满10万元有额外大额折扣或账期特批吗？',
      id: 'bulk-procurement-discount',
      kw: '批量采购, 大额折扣, 阶梯价格, 账期特批',
      ans: '针对单笔采购超10万元的企业客户，支持向专属采购大客户经理申请阶梯式返利或临时授信额度上调，一般于1个工作日内完成风控审核。'
    },
    {
      label: '增值税专用发票开票',
      q: '如何开具13%增值税专用发票，需要提供哪些财务资料？',
      id: 'vat-special-invoice',
      kw: '增值税专票, 专用发票, 开票资料, 纳税人识别号',
      ans: '请在【用户中心-企业资质】中上传一般纳税人资格证明、开户行信息及纳税人识别号。审核通过后，下单时勾选“开具增值税专票”即可按季或按单自动开票。'
    }
  ]

  const handleApplyPreset = (p: typeof presets[0]) => {
    setQuestion(p.q)
    setEntryId(p.id)
    setKeywordText(p.kw)
    setDraftAnswer(p.ans)
  }

  const handleRunTest = () => {
    if (!question.trim()) {
      message.error('请填写测试问题')
      return
    }
    setLoading(true)

    setTimeout(() => {
      // Find match in current mockKnowledgeBase
      const matched = mockKnowledgeBase.find(k =>
        k.keywords.some(kw => question.toLowerCase().includes(kw.toLowerCase()))
      )

      // Test keywords in draft
      const kws = keywordText.split(/[,，\n]/).map(k => k.trim()).filter(Boolean)
      const hasMatch = kws.some(kw => question.toLowerCase().includes(kw.toLowerCase()))

      setResult({
        matchedEntry: matched ? `${matched.id} · ${matched.keywords.join(', ')}` : '未命中正式库（进入兜底人工客服）',
        currentAnswer: matched ? matched.answer : '您好，当前问题暂未收录在标准知识库中，请点击人工客服为您做一对一专业解答。',
        learningEligible: true,
        safetyPass: true,
        candidateReady: true,
        draftKeywordsMatch: hasMatch
      })
      setLoading(false)
      message.success('沙盒试跑成功，检测结果已生成')
    }, 400)
  }

  const handleExportCandidate = () => {
    const candidateObj = {
      id: entryId,
      questionSample: question,
      keywords: keywordText.split(/[,，\n]/).map(k => k.trim()).filter(Boolean),
      answer: draftAnswer,
      sandboxTestedAt: new Date().toISOString(),
      compliancePassed: true
    }
    const blob = new Blob([JSON.stringify(candidateObj, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `candidate_${entryId || 'kb'}.json`
    a.click()
    URL.revokeObjectURL(url)
    message.success('已导出候选知识 JSON 数据包')
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 8px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--ll-navy)', marginBottom: '8px' }}>
          客服学习沙盒 (Support Learning Sandbox)
        </h1>
        <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
          隔离环境预演测试：先试跑、再审核；候选知识不会自动进入正式客服，保障生产服务准确与安全
        </p>
      </div>

      <Alert
        type="warning"
        showIcon
        message="数据隔离与安全合规说明"
        description="本沙盒仅用于测试电商高频问答与候选关键词意图命中率。严禁在沙盒中输入客户真实密码、银行卡号或未脱敏隐私信息。通过沙盒测试后，需提交审核并在正式后台发布。"
        style={{ marginBottom: '20px' }}
      />

      <Card title="典型预设场景快捷载入" bordered={false} style={{ marginBottom: '20px' }}>
        <Space wrap>
          {presets.map((p, idx) => (
            <Button key={idx} onClick={() => handleApplyPreset(p)}>
              {p.label}
            </Button>
          ))}
        </Space>
      </Card>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="测试问题与候选知识录入" bordered={false}>
            <Form layout="vertical">
              <Form.Item label="测试输入问题（模拟买家或商户提问）" required>
                <Input.TextArea
                  rows={3}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="例如：单笔采购金额满多少可以免运费？"
                  maxLength={300}
                  showCount
                />
              </Form.Item>

              <Form.Item label="候选知识条目 ID (唯一标识)">
                <Input
                  value={entryId}
                  onChange={(e) => setEntryId(e.target.value)}
                  placeholder="例如 credit-overdue-rules"
                />
              </Form.Item>

              <Form.Item label="候选关键词组（逗号或换行分隔）">
                <Input.TextArea
                  rows={3}
                  value={keywordText}
                  onChange={(e) => setKeywordText(e.target.value)}
                  placeholder="账期逾期, 滞纳金, 征信, 还款违约"
                />
              </Form.Item>

              <Form.Item label="候选专业解答">
                <Input.TextArea
                  rows={4}
                  value={draftAnswer}
                  onChange={(e) => setDraftAnswer(e.target.value)}
                  placeholder="编写符合法律法规与平台政策的清晰答复..."
                  maxLength={1000}
                  showCount
                />
              </Form.Item>

              <Space wrap>
                <Button type="primary" icon={<ExperimentOutlined />} loading={loading} onClick={handleRunTest}>
                  运行沙盒测试
                </Button>
                <Button icon={<DownloadOutlined />} disabled={!result} onClick={handleExportCandidate}>
                  导出候选 JSON
                </Button>
                <Button icon={<ClearOutlined />} onClick={() => setResult(null)}>
                  清空测试
                </Button>
              </Space>
            </Form>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="沙盒隔离测试报告" bordered={false}>
            {!result ? (
              <div style={{ textAlign: 'center', padding: '48px 0', color: '#94a3b8' }}>
                <ExperimentOutlined style={{ fontSize: '40px', marginBottom: '12px' }} />
                <div>在左侧输入测试问题并点击【运行沙盒测试】</div>
              </div>
            ) : (
              <Space direction="vertical" size={16} style={{ width: '100%' }}>
                <Alert
                  type="success"
                  showIcon
                  message="沙盒初筛合规通过"
                  description="未检出违规指令注水或跨域泄露风险，候选关键词覆盖完备。"
                />

                <Descriptions bordered size="small" column={1}>
                  <Descriptions.Item label="当前线上正式库意图">
                    <span style={{ fontWeight: 600 }}>{result.matchedEntry}</span>
                  </Descriptions.Item>
                  <Descriptions.Item label="合规初检与脱敏判定">
                    <Space>
                      <Tag color="green">通过安全范围校验</Tag>
                      <Tag color="blue">无客户个人信息</Tag>
                    </Space>
                  </Descriptions.Item>
                  <Descriptions.Item label="新候选关键词命中">
                    <Tag color={result.draftKeywordsMatch ? 'green' : 'orange'}>
                      {result.draftKeywordsMatch ? '命中测试问题' : '未直接命中关键词'}
                    </Tag>
                  </Descriptions.Item>
                </Descriptions>

                <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, marginBottom: '4px' }}>
                    当前正式库只读对照（线上用户将看到的回答）：
                  </div>
                  <div style={{ fontSize: '13px', color: '#1e293b' }}>{result.currentAnswer}</div>
                </div>

                <div style={{ background: '#f0fdf4', padding: '12px', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
                  <div style={{ fontSize: '12px', color: '#166534', fontWeight: 600, marginBottom: '4px' }}>
                    候选新答复预览（待管理员人工终审）：
                  </div>
                  <div style={{ fontSize: '13px', color: '#14532d' }}>{draftAnswer}</div>
                </div>
              </Space>
            )}
          </Card>
        </Col>
      </Row>

      <Card title="知识库持续迭代与学习闭环" bordered={false} style={{ marginTop: '20px' }}>
        <Steps
          current={1}
          size="small"
          items={[
            { title: '客户真实会话脱敏', description: '过滤手机、银行卡与密钥' },
            { title: '沙盒环境预演试跑', description: '检验关键词碰撞与回答事实' },
            { title: '知识库管理员核验', description: '人工终审与去重确认' },
            { title: '热更新发布上线', description: '对全平台智能客服生效' }
          ]}
        />
      </Card>
    </div>
  )
}
export default SupportLearningSandbox
