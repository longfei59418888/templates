export const Structure = () => {
  return (
    <div className="border-l border-black [&_p]:m-0! border-solid">
      <p className={'before:content-["---"]'}>src</p>
      <p className={'before:content-["---------"]'}>app【页面】</p>
      <p className={'before:content-["----------------"]'}>app【页面】</p>
      <p className={'before:content-["---------"]'}>pages </p>
      <p className={'before:content-["---"]'}>public【静态资源】</p>
      <p className={'before:content-["---"]'}>next.config.js【配置文件】</p>
      <p className={'before:content-["---"]'}>instrumentation.ts【日志监控文件】</p>
      <p className={'before:content-["---"]'}>middleware.ts【请求中间件】</p>
      <p className={'before:content-["---"]'}>.env【环境配置】</p>
    </div>
  );
};
