import { Spin } from 'antd';

function CLoadingPage() {
  return (
    <div className="flex-1 h-screen w-full flex justify-center items-center bg-white">
      <Spin
        size="large"
        style={{
          fontSize: 24,
        }}
      />
    </div>
  );
}

export default CLoadingPage;
