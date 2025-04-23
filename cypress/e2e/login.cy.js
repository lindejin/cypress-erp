describe('登录测试', () => {
    beforeEach(() => {
      // 在每个测试用例前访问登录页面
      cy.visit('/login') // 这里的URL路径要根据你的实际登录页面路径来修改
    })
  
    it('成功登录', () => {
      // 输入用户名
      cy.get('[data-test="username"]') // 使用data-test属性选择器(推荐)
        .type('your_username')  // 替换成实际的测试用户名
      
      // 输入密码  
      cy.get('[data-test="password"]')
        .type('your_password')
      
      // 点击登录按钮
      cy.get('[data-test="login-button"]')
        .click()
      
      // 验证登录成功
      cy.url().should('include', '/dashboard') // 验证URL包含dashboard
      cy.get('[data-test="welcome-message"]')
        .should('contain', '欢迎回来') // 验证欢迎信息
    })
  
    it('登录失败 - 错误的凭证', () => {
      cy.get('[data-test="username"]')
        .type('wrong_user')
      
      cy.get('[data-test="password"]')
        .type('wrong_password')
      
      cy.get('[data-test="login-button"]')
        .click()
      
      // 验证错误提示
      cy.get('[data-test="error-message"]')
        .should('be.visible')
        .and('contain', '用户名或密码错误')
    })
  })