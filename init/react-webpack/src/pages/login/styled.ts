import styled from 'styled-components';
import { Layout } from 'antd';

export const Container = styled(Layout)`
  height: 100%;
  min-width: 1000px;
  background: #f9fbfd;
`;

export const ContentContainer = styled.div`
  padding: 0 10% 24px;
  > div {
    width: 100%;
    height: 640px;

    @media (max-width: 1440px) {
      height: 570px;
    }

    max-width: 1200px;
    margin: 0 auto;
    background: #fff;
    border-radius: 16px;
    overflow: hidden;
    position: relative;
    background: url('https://sso.golingo.cn/sso/gl/images/5ef53642aa4b537184fa913c6b92ea9elogin-zh.png')
    no-repeat;
    background-size: auto 100%;
  }
`;

export const LoginContainer = styled.div`
  width: 672px;
  position: absolute;
  height: 100%;
  right: 0;
  top: 0;
  @media (max-width: 1440px) {
    width: 705px;
  }
  padding-block: 24px;
  padding-inline: 104px 104px;
  background-color: rgba(255, 255, 255, 0.85);
`;

export const Title = styled.h2`
  line-height: 72px;
  color: #121216;
  font-weight: 600;
  font-size: 32px;
  margin: 0;
  position: relative;
`;

export const TitleBack = styled.a`
  line-height: 12px;
  color: #3c62ff;
  font-size: 12px;
  margin: 0;
  position: absolute;
  right: 4px;
  bottom: 20px;
`;
