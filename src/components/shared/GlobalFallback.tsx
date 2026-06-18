const GlobalFallback = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#FE3403]/5 via-transparent to-[#FE8003]/5">
        <div className="absolute top-20 left-20 w-32 h-32 border border-[#FE3403]/10 rounded-full animate-float"></div>
        <div className="absolute bottom-32 right-32 w-20 h-20 border border-[#FE8003]/15 rounded-full animate-float-delayed"></div>
      </div>

      <div className="relative text-center space-y-6 px-6 animate-fadeInUp">
        <div className="relative mx-auto w-16 h-16 animate-pulse-glow">
          <div className="absolute inset-0 border-4 border-transparent border-t-[#FE3403] border-r-[#FE8003] rounded-full animate-spin"></div>
          <div className="absolute inset-4 bg-gradient-to-r from-[#FE3403] to-[#FE8003] rounded-full animate-pulse"></div>
          <div className="absolute inset-6 bg-white rounded-full animate-ping opacity-75"></div>
        </div>

        <div className="space-y-2">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#586474] animate-fade-in animation-delay-200">
            Admord Global Multiservices
          </div>
          <h1 className="text-2xl font-bold text-gradient animate-slide-up animation-delay-200">
            Admord Performance Management System
          </h1>
          <p className="text-[#586474] font-medium max-w-xs mx-auto leading-relaxed animate-fade-in animation-delay-400">
            Preparing your performance dashboard…
          </p>
        </div>

        <div className="w-32 mx-auto animate-scale-x-in animation-delay-500">
          <div className="h-1 bg-[#E6E6E6] rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#FE3403] to-[#FE8003] rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalFallback;
