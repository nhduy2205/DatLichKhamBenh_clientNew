export default function HomePage() {
    return (
      <main className="w-full">
        <div className="bg-gray-100">
          <section
            className="cover bg-blue-teal-gradient relative bg-blue-600 px-4 sm:px-8 lg:px-16 xl:px-40 2xl:px-64 overflow-hidden py-48 flex
      items-center min-h-screen"
          >
            <div className="h-full absolute top-0 left-0 z-0">
              <img
                src="/cover-bg.jpg"
                alt=""
                className="w-full h-full object-cover opacity-20"
              />
            </div>
  
            <div className="lg:w-3/4 xl:w-2/4 relative z-10 h-100">
              <div>
                <h2 className="text-white text-3xl md:text-4xl xl:text-5xl font-bold leading-tight uppercase">
                  Đặt lịch khám bệnh <p className="mt-2">trực tuyến</p>
                </h2>
                <div className="grid grid-cols-3 gap-1 mt-4 ">
                  <div
                    className="block rounded-lg bg-white px-2 flex justify-center items-center
                  shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] "
                  >
                    <img src="/nhanh.png" alt="" className="w-16 h-16" />
                    <div>
                      <p className="text-blue-700 font-md text-sm">Tiết kiệm</p>
                      <p className="text-blue-700 font-md text-sm">thời gian</p>
                    </div>
                  </div>
                  <div
                    className="block rounded-lg bg-white px-2 flex justify-center items-center
                  shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] "
                  >
                    <img src="/like.png" alt="" className="w-12 h-12" />
                    <div className="ml-2">
                      <p className="text-blue-700 font-md text-sm">Dễ dàng</p>
                      <p className="text-blue-700 font-md text-sm">thực hiện</p>
                    </div>
                  </div>
                  <div
                    className="block rounded-lg bg-white px-2 flex justify-center items-center
                  shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] "
                  >
                    <img src="/wait.png" alt="" className="w-12 h-12" />
                    <div className="ml-2">
                      <p className="text-blue-700 font-md text-sm">Không cần</p>
                      <p className="text-blue-700 font-md text-sm">chờ đợi</p>
                    </div>
                  </div>
                </div>
                <a
                  href="dang-ky-dang-nhap"
                  className="px-8 py-4 bg-blue-700 text-white rounded inline-block mt-8 font-semibold"
                >
                  Đặt lịch khám
                </a>
              </div>
            </div>
          </section>
        </div>
  
        {/* <section className="relative bg-white px-4 py-8 sm:px-4 lg:px-8 xl:px-20 2xl:px-32 lg:py-16">
          <h2 className="text-blue-700 text-xl md:text-2xl xl:text-3xl font-bold leading-tight">
            ĐỘI NGŨ CHUYÊN GIA ĐẦU NGÀNH
          </h2>
          <div className="md:flex md:flex-wrap mt-8 text-center md:-mx-4">
            <div className="md:w-1/2 md:px-4 lg:w-1/4">
              <div className="bg-white rounded-lg border border-gray-300 p-8">
                <img
                  src="images/teeth-whitening.svg"
                  alt=""
                  className="h-20 mx-auto"
                />
  
                <h4 className="text-xl font-bold mt-4">Teeth Whitening</h4>
                <p className="mt-1">Let us show you how our experience.</p>
                <a href="#" className="block mt-4">
                  Read More
                </a>
              </div>
            </div>
  
            <div className="md:w-1/2 md:px-4 mt-4 md:mt-0 lg:w-1/4">
              <div className="bg-white rounded-lg border border-gray-300 p-8">
                <img
                  src="images/oral-surgery.svg"
                  alt=""
                  className="h-20 mx-auto"
                />
  
                <h4 className="text-xl font-bold mt-4">Oral Surgery</h4>
                <p className="mt-1">Let us show you how our experience.</p>
                <a href="#" className="block mt-4">
                  Read More
                </a>
              </div>
            </div>
  
            <div className="md:w-1/2 md:px-4 mt-4 md:mt-8 lg:mt-0 lg:w-1/4">
              <div className="bg-white rounded-lg border border-gray-300 p-8">
                <img
                  src="images/painless-dentistry.svg"
                  alt=""
                  className="h-20 mx-auto"
                />
  
                <h4 className="text-xl font-bold mt-4">Painless Dentistry</h4>
                <p className="mt-1">Let us show you how our experience.</p>
                <a href="#" className="block mt-4">
                  Read More
                </a>
              </div>
            </div>
  
            <div className="md:w-1/2 md:px-4 mt-4 md:mt-8 lg:mt-0 lg:w-1/4">
              <div className="bg-white rounded-lg border border-gray-300 p-8">
                <img
                  src="images/periodontics.svg"
                  alt=""
                  className="h-20 mx-auto"
                />
  
                <h4 className="text-xl font-bold mt-4">Periodontics</h4>
                <p className="mt-1">Let us show you how our experience.</p>
                <a href="#" className="block mt-4">
                  Read More
                </a>
              </div>
            </div>
          </div>
        </section> */}
        <section className="relative bg-gray-100 px-4 sm:px-8 lg:px-16 xl:px-40 2xl:px-64 py-16 lg:py-32">
          <div className="flex flex-col lg:flex-row lg:-mx-8">
            <div className="w-full lg:w-1/2 lg:px-8">
              <h2 className="text-2xl leading-tight font-bold mt-4 text-blue-600">
                Tại sao cần đặt lịch khám online tại nhà ?
              </h2>
              <p className="mt-2 leading-relaxed  text-blue-600">
                Tiện Lợi và Tiết Kiệm Thời Gian: Bệnh nhân không cần di chuyển đến
                phòng mạch hoặc bệnh viện, tiết kiệm thời gian và công sức, đặc
                biệt là trong các trường hợp khẩn cấp hoặc khi bệnh nhân không thể
                tự lái xe. Tránh Đợi Lâu: Tránh tình trạng chờ đợi lâu tại phòng
                mạch hoặc bệnh viện, giúp giảm căng thẳng và không gian chật chội.
                An Toàn và Giảm Nguy Cơ Lây Nhiễm: Tránh tiếp xúc với các bệnh
                nhân khác, giúp giảm nguy cơ lây nhiễm các bệnh truyền nhiễm, đặc
                biệt trong thời kỳ dịch bệnh. Giữ Bí Mật Tốt Hơn: Nhiều người cảm
                thấy thoải mái hơn khi nói chuyện với bác sĩ từ sự riêng tư của
                nhà mình.
              </p>
            </div>
  
            <div className="w-full md:max-w-md md:mx-auto lg:w-1/2 lg:px-8 mt-12 mt:md-0">
              <img
                src="/app-mockup.jpg"
                className="h-100 object-cover max-w-full rounded-lg"
                alt=""
              />
            </div>
          </div>
        </section>
      
       
      </main>
    );
  }
  