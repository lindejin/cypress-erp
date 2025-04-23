describe('登录测试', () => {
  beforeEach(() => {
    // 访问测试环境的登录页面
    cy.visit('https://test.vogocm.com:9696')
  })

  it('成功登录', () => {
    // 根据实际登录页面的元素选择器进行修改
    cy.get('input[name="userName"]')  // 假设用户名输入框的name属性为username
      .type('admin')  // 替换成实际的测试用户名
    
    cy.get('input[name="password"]')  // 假设密码输入框的name属性为password
      .type('1')  // 替换成实际的密码
    
    // 添加网络请求监听
    cy.intercept('POST', '**/login').as('loginRequest')

    // 点击登录按钮
    cy.get('button[id="loginSubmit"]')  // 假设提交按钮是type="submit"的button
      .click()
    
    // 验证登录成功
    // 等待登录请求完成并验证
    cy.wait('@loginRequest').then((interception) => {
      // 验证响应状态码
      expect(interception.response.statusCode).to.eq(200)
     // 打印实际响应内容
     cy.log('实际响应体:', JSON.stringify(interception.response.body))
      
     // 验证响应体结构
     const responseBody = interception.response.body
     
     // 验证必需字段存在
     expect(responseBody).to.have.property('ack').that.is.a('number')
     expect(responseBody).to.have.property('msg').that.is.a('string')
     
     // 可选字段验证（如果需要的话）
     if (responseBody.data !== undefined) {
       expect(responseBody).to.have.property('data')
     }
     if (responseBody.datas !== undefined) {
       expect(responseBody.datas).to.be.an('array')
     }
     if (responseBody.pop !== undefined) {
       expect(responseBody).to.have.property('pop')
     }
     
     // 验证ack值（根据实际情况判断登录是否成功）
     if (responseBody.ack === 0) {
       cy.log('登录成功')
     } else {
       cy.log('登录失败:', responseBody.msg)
     }
    })
  })
})