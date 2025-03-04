import {  Carousel, Flex, Image, Typography } from 'antd';
interface AuthLayoutProps {
  children: React.ReactNode;
}
function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <Flex
      justify="center"
      align="center"
      className="h-screen w-screen bg-gray-100 flex-wrap md:flex-nowrap overflow-hidden"
    >
      <div className="hidden lg:block w-1/2 ">
        <Carousel autoplay>
          {[
            '/image1.png',
            '/image2.png',
            '/image3.png',
            '/image4.png',
            '/image5.png',
          ].map((src, index) => (
            <div key={index} className="rounded-lg overflow-hidden">
              <Image src={src} preview={false} className="w-full rounded-lg " />
            </div>
          ))}
        </Carousel>
      </div>
      <Flex vertical className="w-full lg:w-1/3 p-4">
        <Flex align="center" gap={3} justify="center">
          <Image src="/logo.png" preview={false} width={50} height={50} />

          <Typography.Title level={3} style={{ color: '#ea580c' }}>
            HAPPY
          </Typography.Title>

          <Typography.Title level={3}>HUNT</Typography.Title>
        </Flex>
        {children}
      </Flex>
    </Flex>
  );
}

export default AuthLayout;
