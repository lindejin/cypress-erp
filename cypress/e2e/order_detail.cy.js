describe('订单测试', () => {
    beforeEach(() => {
        // 访问测试环境的登录页面并登录
        cy.visit('https://test.vogocm.com:9696')

        // 执行登录操作
        cy.get('input[name="userName"]')
            .type('admin')

        cy.get('input[name="password"]')
            .type('1')

        cy.intercept('POST', '**/login').as('loginRequest')
        cy.get('button[id="loginSubmit"]')
            .click()

        // 等待登录成功
        cy.wait('@loginRequest').then((interception) => {
            expect(interception.response.statusCode).to.eq(200)
            const responseBody = interception.response.body
            expect(responseBody.ack).to.eq(0) // 确保登录成功
        })
    })

    it('访问订单详情', () =>  {
        // 访问测试环境的登录页面并登录
        // 指定订单编号 2504231WHEUTD9
        // 切换当前网址为订单详情 2504231X5W2AP1 为订单号http://192.168.10.122:11666/modules/order/order_details.html?orderNo=2504231X5W2AP1&returnHtml=undefined&pageSize=50&currentPage=1
         // 监听订单详情请求
         cy.intercept('GET', '**/api/order/getOrderDetailsByOrderNo**').as('orderDetailsRequest')
         const orderNo = '2504231WHEUTD9' // 将订单号设置为常量
         // 直接访问订单详情页面
         cy.visit(`https://test.vogocm.com:9696/modules/order/order_details.html?orderNo=${orderNo}`)
 
         // 等待订单详情数据加载
        //  cy.wait('@orderDetailsRequest', { timeout: 10000 }).then((interception) => {
        //      expect(interception.response.statusCode).to.eq(200)
        //      const detailsResponse = interception.response.body
        //      expect(detailsResponse).to.have.property('ack').that.is.a('number')
        //      expect(detailsResponse).to.have.property('datas').that.is.an('object')
        //  })
        // 等待订单详情数据加载
        cy.wait('@orderDetailsRequest', { timeout: 10000 }).then((interception) => {
            expect(interception.response.statusCode).to.eq(200)
            const detailsResponse = interception.response.body
            expect(detailsResponse).to.have.property('ack').that.is.a('number')
            expect(detailsResponse).to.have.property('data').that.is.an('object')
        })
    })
})