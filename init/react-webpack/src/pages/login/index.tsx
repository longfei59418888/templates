import React, { FC, useEffect, useState } from 'react'
import { Layout } from 'antd'
import { Page, Header, Logo, Login, Hooks, Style } from 'xl-story-book'

import {
  Container,
  ContentContainer,
  LoginContainer,
  Title,
  TitleBack,
} from './styled'
import { LoginPageType } from './propsType'
import { ThirdParty } from 'xl-story-book/types/components/login/propsType'
import { getThirdParties } from '@src/apis/login'

const contactsMock = [
  { title: '用户隐私协议1', pathname: '' },
  { title: '用户隐私协议2', pathname: '' },
  { title: '用户隐私协议3', pathname: '' },
]

const RegisterPage: FC = () => {
  const [search] = Hooks.useSearch<{ type: LoginPageType }>()
  const [type, setType] = useState<LoginPageType>(
    search.type ?? LoginPageType.LOGIN,
  )
  const [thirdParties, setThirdParties] = useState<ThirdParty[]>()

  useEffect(() => {
    void getThirdParties().then((result) =>
      setThirdParties(
        result.map((thirdParty) => ({
          icon: thirdParty.iconUrl,
          url: thirdParty.iconUrl,
          title: thirdParty.name,
          id: thirdParty.code,
        })),
      ),
    )
  }, [

  ])

  return (
    <Page>
      <Container>
        <Layout.Header>
          <Header left={Logo.UnipusSso} />
        </Layout.Header>
        <Layout.Content>
          <ContentContainer>
            <Style.Center>
              <LoginContainer>
                {type === LoginPageType.REGISTER ? (
                  <>
                    <Title>
                      注册
                      <TitleBack onClick={() => setType(LoginPageType.LOGIN)}>
                        返回登陆
                      </TitleBack>
                    </Title>
                    <Login.Register contacts={contactsMock} />
                  </>
                ) : (
                  <>
                    <Title>登录</Title>
                    <Login
                      thirdParties={thirdParties ?? []}
                      submitProps={{
                        onRegister: () => setType(LoginPageType.REGISTER),
                      }}
                      contacts={contactsMock}
                    />
                  </>
                )}
              </LoginContainer>
            </Style.Center>
          </ContentContainer>
        </Layout.Content>
      </Container>
    </Page>
  )
}

export default RegisterPage
