import React, { Fragment, useRef, useState, useEffect } from "react";
import "./../../app/globals.css";
import axios from "axios";
import Header from "@/components/Heaser";
import Footer from "@/components/footer";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import QRCode from "qrcode.react"
import { Listbox, Transition, Dialog } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
export default function DatLichKham() {
  const router = useRouter()

  const [open, setOpen] = useState(false);
  const [khunggiokham, setKhunggiokham] = useState(0);
  const [khunggiokhamErrors, setKhunggiokhamErrors] = useState('');
  const cancelButtonRef = useRef(null);
  const url = "http://localhost:5000/api/thongtinbenhnhan/" + router.query.id;
  const urlChuyenKhoa = "http://localhost:5000/api/chuyenkhoa/";
  const urlKhungGioKham = "http://localhost:5000/api/phongkham/laykhunggiokham";
  const UrlKhungGioKhamTheoNgay = "http://localhost:5000/api/thongtinbenhnhan/laytheongay";
  const [thongTinHoSo, setThongTinHoSo] = useState<any>([]);
  const [chuyenkhoa, setDataChuyenKhoa] = useState<any>([]);
  const [khungGioKhamServer, setKhungGioKhamServer] = useState<any>([])
  const [ngaykham, setNgaykham] = useState<any>(new Date());
  const [khungGioKhamTheoNgay, setKhungGioKhamTheoNgay] = useState<any>([]);
  const [khoakhamid, setkhoakhamid] = useState<any>('');
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [xacNhan, setXacNhan] = useState<any>();
  const [openThanhCong, setOpenThanhCong] = useState(false);
  const [idLichKham, setIdLichKham] = useState('');
  const people = [
    { name: 'MoMo', img: '/momo.png' },
    { name: 'ZaloPay', img: '/zalopay.png' },
    { name: 'VNPay', img: '/vnpay.png' },
  ]
  const [selected, setSelected] = useState(people[0])

  const onSubmit = (values: any) => {

    if (khunggiokham > 0) {
      setKhunggiokhamErrors('')
      const data = {
        ...values,
        ngaykham: ngaykham.setDate(ngaykham.getDate() + 1),
        chuyenkhoa: khoakhamid,
        khunggiokham: khunggiokham,
        hinhthucthanhtoan: 'CK',
        trangthaixacthuc: true
      }
      console.log('>>>>>>>data', JSON.stringify(data));
      setXacNhan(data)
      setOpenThanhCong(true)
    } else {
      setKhunggiokhamErrors('Vui lòng chọn khung giờ khám')
    }
  }

  const submitDatlich = async (data: any) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        "http://localhost:5000/api/datlichkham/" + router.query.id,
        JSON.stringify(data),
        config
      );
      console.log("Thong tin đặt lịch", res?.data);
      setIdLichKham(res?.data)
      setOpen(true)
      setOpenThanhCong(false)
    } catch (err) {
      console.log(err);
    }
  }
  const fetchInfo = () => {
    return axios.get(url).then((res) => setThongTinHoSo(res.data));
  };
  const fetchChuyenKhoa = () => {
    return axios.get(urlChuyenKhoa).then((res) => setDataChuyenKhoa(res.data));
  };
  const fetchKhungGioKham = () => {
    return axios.get(urlKhungGioKham).then((res) => setKhungGioKhamServer(res.data));
  };

  useEffect(() => {
    if (router.query.id) {
      fetchInfo();
      fetchChuyenKhoa();
      fetchKhungGioKham();
    }
  }, [router.query.id]);

  useEffect(() => {
    setkhoakhamid(chuyenkhoa[0]?._id);
    setValue("ngaykham", new Date());
  }, [chuyenkhoa]);


  function padTo2Digits(num: any) {
    return num.toString().padStart(2, '0');
  }

  function formatDate(date: any) {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('/');
  }
  const getCurrentDateInput = (dateObj: Date) => {

    // get the month in this format of 04, the same for months
    const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
    const day = ("0" + dateObj.getDate()).slice(-2);
    const year = dateObj.getFullYear();

    const shortDate = `${year}-${month}-${day}`;

    return shortDate;
  };
  const getCurrentDateInputDDMMYYY = (dateObj: Date) => {

    // get the month in this format of 04, the same for months
    const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
    const day = ("0" + dateObj.getDate()).slice(-2);
    const year = dateObj.getFullYear();

    const shortDate = `${day}/${month}/${year}`;

    return shortDate;
  };

  const getKhungGioKhamTheoNgay = async (khoakhamid: string, ngaykham) => {
    const ngaykhamParam = {
      ngaykham: getCurrentDateInput(ngaykham),
      chuyenkhoa: khoakhamid
    }
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        UrlKhungGioKhamTheoNgay,
        JSON.stringify(ngaykhamParam),
        config
      );
      console.log('>>lay ds theo ngay: ', res?.data?.datlich);
      setKhungGioKhamTheoNgay(res?.data?.datlich)
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    console.log('>>>>chuyenkhaid', khoakhamid);

    if (khoakhamid?.length > 0) {

      getKhungGioKhamTheoNgay(khoakhamid, ngaykham)
    }
  }, [khoakhamid, ngaykham])
  const checktime = (lichdat: number) => {
    const currentDate = new Date();

    // Get the current hour (0-23)
    const currentHour = currentDate.getHours();
    if (ngaykham > currentDate) {
      return true
    } else if (ngaykham === currentDate) {
      if (currentHour < lichdat) {
        return true
      } else { return false }
    } else {
      return false
    }

  }

  return (
    <div className="bg-white">
      <Header />
      <main className="w-full">
        <div className="bg-gray-200">
          <section className="cover bg-gray-200 relative bg-white px-4 sm:px-8 lg:px-16 xl:px-40 2xl:px-64 overflow-hidden py-4">
            <text className="block text-xl font-medium leading-6 text-gray-900 mb-4">Đăng ký lịch khám </text>
            <div className="grid grid-cols-4 gap-4 mb-4">
              <text className="block text-sm font-medium leading-6 text-gray-900">Họ tên: </text>
              <text className="block text-sm font-medium leading-6 text-gray-900">{
                thongTinHoSo?.hoten
              }</text>
            </div>
            <div className="grid grid-cols-4 gap-4 mb-4">
              <text className="block text-sm font-medium leading-6 text-gray-900">Giới tính: </text>
              <text className="block text-sm font-medium leading-6 text-gray-900">{
                thongTinHoSo?.gioitinh ? 'Nam' : "Nữ"
              }</text>
            </div>
            <div className="grid grid-cols-4 gap-4 mb-4">
              <text className="block text-sm font-medium leading-6 text-gray-900">Ngày sinh: </text>
              <text className="block text-sm font-medium leading-6 text-gray-900">{
                formatDate(new Date(thongTinHoSo?.ngaysinh))
              }</text>
            </div>
            <div className="grid grid-cols-4 gap-4 mb-4">
              <text className="block text-sm font-medium leading-6 text-gray-900">Địa chỉ: </text>
              <text className="block text-sm font-medium leading-6 text-gray-900">{
                thongTinHoSo?.diachi
              }</text>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-4 gap-4 mb-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Chọn khoa khám
                </label>
                <div>
                  <select id="countries"
                    value={khoakhamid}
                    onChange={(event: any) => setkhoakhamid(event.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
                     focus:border-blue-500 block w-full p-2.5">
                    {chuyenkhoa?.map((item: any) =>
                      <option value={item?._id}>{item?.tenchuyenkhoa}</option>
                    )}

                  </select>

                  {khoakhamid && khoakhamid?.lengnth === 0 && (
                    <p className="text-red-700 text-sm">
                      Vui lòng chọn khoa khám bệnh
                    </p>
                  )}
                </div>


              </div>

              <div className="grid grid-cols-4 gap-4 mb-4">

                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Chọn Ngày khám
                </label>
                <div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      defaultValue={dayjs(getCurrentDateInput(ngaykham))}
                      format="DD/MM/YYYY"
                      onChange={(value: any) => {
                        setNgaykham(value?.$d)

                      }}
                    />
                  </LocalizationProvider>

                  {errors.ngaykham && errors.ngaykham.type === "required" && (
                    <p className="text-red-700 text-sm">
                      Vui lòng chọn ngày khám
                    </p>
                  )}
                </div>


              </div>
              <div className="grid grid-cols-4 gap-x-1 gap-y-4 mb-4">

                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Chọn khám
                </label>
                <div className="col-span-2">
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    {khungGioKhamServer?.map((item: any) =>
                      <div className={"box-border p-4 border-2 text-sm" + (checktime(item?.giobatdau) === true ? (khungGioKhamTheoNgay?.findIndex((kg: any) => kg?.khunggiokham === item?.giatri) > -1 ? " border-emerald-600 hover:cursor-not-allowed rounded " : " border-indigo-600 hover:cursor-pointer rounded hover:font-semibold ") : " bg-gray-400 hover:cursor-not-allowed rounded ") +
                        (checktime(item?.giobatdau) === true ? (khungGioKhamTheoNgay?.findIndex((kg: any) => kg?.khunggiokham === item?.giatri) > -1 ? " bg-emerald-600 text-white" : (item?.giatri === khunggiokham ? " bg-indigo-500 text-white font-semibold " : " bg-white text-indigo-600 ")) : 'bg-gray-400 text-white') +
                        "hover:bg-indigo-500 hover:text-white flex align-center justify-center"}
                        onClick={() => setKhunggiokham(item?.giatri)}
                      >
                        {item?.khunggiokham}
                      </div>
                    )}
                  </div>
                  {khunggiokhamErrors?.length > 0 && (
                    <p className="text-red-700 text-sm">
                      {khunggiokhamErrors}
                    </p>
                  )}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="flex">
                      <div className="h-8 w-8 bg-emerald-600 mr-3"></div>
                      <div className="block text-sm font-medium leading-6 text-gray-700">Đã đặt</div>
                    </div>
                    <div className="flex">
                      <div className="h-8 w-8 bg-gray-400 mr-3"></div>
                      <div className="block text-sm font-medium leading-6 text-gray-700">Đã quá giờ</div>
                    </div>
                    <div className="flex">
                      <div className="h-8 w-8 bg-indigo-500 mr-3"></div>
                      <div className="block text-sm font-medium leading-6 text-gray-700">Còn trống lịch</div>
                    </div>

                  </div>
                </div>


              </div>
              <div className="grid grid-cols-4 gap-4 mb-4">

                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Triệu chứng
                </label>
                <div className="col-span-2">
                  <textarea id="w3review" rows={4} cols={50}
                    {...register("trieuchung", { required: true })}
                    className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
                  ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                   focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />

                  {errors.trieuchung && errors.trieuchung.type === "required" && (
                    <p className="text-red-700 text-sm">
                      Vui lòng nhập triệu chứng
                    </p>
                  )}
                </div>


              </div>
              <div className="grid grid-cols-4 gap-x-1 gap-y-4 mb-4">
                <div className="col-start-2 bg-white py-3 sm:flex sm:flex-row gap-x-4">
                  <button
                    type="submit"
                    disabled={khunggiokham === 0 ? true : false}
                    className={"mt-3 inline-flex w-full justify-center rounded-md" +
                      (khunggiokham === 0 ? " bg-gray-400 cursor-not-allowed " : " bg-indigo-600 ")
                      + "px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-200 sm:mt-0 sm:w-auto"}
                  >
                    Đặt lịch khám
                  </button>
                  {/* <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 
                        text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-400 
                        hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Hủy bỏ
                  </button> */}
                </div>
              </div>
            </form>
          </section>
        </div>
      </main>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-100 w-1/2"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-100 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel
                  className="relative z-100 transform overflow-hidden rounded-lg bg-white
                 text-left shadow-xl transition-all sm:my-8 sm:w-1/2"
                >
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="flex items-center justify-center mb-4">
                      <img src="/datlichthanhcong.png" alt="" className="w-12 h-12" />
                    </div>
                    <Dialog.Title
                      as="h2"
                      className="text-center text-lg text-base font-semibold leading-6 text-indigo-600 mb-4 text-center"
                    >
                      Bạn đã đặt thành công lịch khám bệnh vói các thông tin dưới đây
                    </Dialog.Title>
                    <div className="grid grid-cols-4 gap-4 mb-2">
                      <div className="col-span-3">
                        <div className="grid grid-cols-2 gap-4 mb-2">
                          <text className="block text-sm font-medium leading-6 text-gray-900">Họ tên: </text>
                          <text className="block text-sm font-medium leading-6 text-gray-900">{
                            thongTinHoSo?.hoten
                          }</text>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-2">
                          <text className="block text-sm font-medium leading-6 text-gray-900">Giới tính: </text>
                          <text className="block text-sm font-medium leading-6 text-gray-900">{
                            thongTinHoSo?.gioitinh ? 'Nam' : "Nữ"
                          }</text>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-2">
                          <text className="block text-sm font-medium leading-6 text-gray-900">Ngày sinh: </text>
                          <text className="block text-sm font-medium leading-6 text-gray-900">{
                            formatDate(new Date(thongTinHoSo?.ngaysinh))
                          }</text>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-2">
                          <text className="block text-sm font-medium leading-6 text-gray-900">Địa chỉ: </text>
                          <text className="block text-sm font-medium leading-6 text-gray-900">{
                            thongTinHoSo?.diachi
                          }</text>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-2">
                          <text className="block text-sm font-medium leading-6 text-gray-900">Khoa khám bệnh: </text>
                          <text className="block text-sm font-medium leading-6 text-gray-900">{
                            chuyenkhoa?.find((item: any) => item?._id === khoakhamid)?.tenchuyenkhoa
                          }</text>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-2">
                          <text className="block text-sm font-medium leading-6 text-gray-900">Ngày khám: </text>
                          <text className="block text-sm font-medium leading-6 text-gray-900">{
                            ngaykham && getCurrentDateInputDDMMYYY(ngaykham)

                          }</text>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-2">
                          <text className="block text-sm font-medium leading-6 text-gray-900">Khung giờ khám: </text>
                          <text className="block text-sm font-medium leading-6 text-gray-900">
                            {khungGioKhamServer?.find((item: any) => item?.giatri === khunggiokham)?.khunggiokham
                            }</text>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-2">
                          <text className="block text-sm font-medium leading-6 text-gray-900">Triệu chứng: </text>
                          <text className="block text-sm font-medium leading-6 text-gray-900">
                            {xacNhan?.trieuchung}
                          </text>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <QRCode
                          value={idLichKham}
                          size={100}
                          level={"H"}
                          includeMargin={true}
                        />
                      </div>

                    </div>

                  </div>


                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-x-4">
                    <button
                      type="submit"
                      className="mt-3 inline-flex w-full justify-center rounded-md 
                        bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 
                        ring-inset ring-gray-200 sm:mt-0 sm:w-auto"
                      onClick={() => router.push('/danh-sach-lich-kham/' + router.query?.id)}
                    >
                      Đến trang danh sách lịch khám
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 
                        text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-400 
                        hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Hủy bỏ
                    </button>
                  </div>

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <Transition.Root show={openThanhCong} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-100 w-1/3"
          onClose={setOpenThanhCong}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-100 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel
                  className="relative z-100 transform overflow-hidden rounded-lg bg-white
                 text-left shadow-xl transition-all sm:my-8 sm:w-1/2">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <Dialog.Title
                      as="h2"
                      className="text-center text-lg text-base font-semibold leading-6 text-indigo-600 mb-4"
                    >
                      XÁC NHẬN THÔNG TIN THANH TOÁN
                    </Dialog.Title>

                    <div className="grid grid-cols-4 gap-4 mb-2">
                      <div className="col-span-3">
                        <p className="text-md font-semibold text-indigo-600">Thông tin thanh toán</p>
                        <div className="grid grid-cols-2 gap-4 mb-2">
                          <text className="block text-sm font-medium leading-6 text-gray-900">Số tiền thanh toán: </text>
                          <text className="block text-sm font-semibold leading-6 text-indigo-600">
                            110.000 VNĐ
                          </text>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-2">
                          <text className="block text-sm font-medium leading-6 text-gray-900">Hình thức thanh toán: </text>
                          <text className="block text-sm font-medium leading-6 text-gray-900">
                            <div className="w-72">
                              <Listbox value={selected} onChange={setSelected}>
                                <div className="relative mt-1">
                                  <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left 
                                  border-2 border-indigo-400 focus:shadow-md 
                                  focus:outline-none focus-visible:border-indigo-500 
                                  focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 sm:text-sm">
                                    <span className="block truncate flex">
                                      <img src={selected.img} alt="" className="w-4 h-4 mr-4" />
                                      {selected.name}
                                    </span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                      <ChevronUpDownIcon
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  </Listbox.Button>
                                  <Transition
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                  >
                                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto 
                                    rounded-md bg-white py-1 text-base shadow-lg ring-1 
                                    ring-black/5 focus:outline-none sm:text-sm">
                                      {people.map((person, personIdx) => (
                                        <Listbox.Option
                                          key={personIdx}
                                          className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-indigo-100 text-indigo-900' : 'text-gray-900'
                                            }`
                                          }
                                          value={person}
                                        >
                                          {({ log }) => (
                                            <>
                                              <span
                                                className={`block truncate flex ${selected.name === person.name ? 'font-medium text-indigo-600' : 'font-normal text-gray-900'
                                                  }`}
                                              >
                                                <img src={person.img} alt="" className="w-4 h-4 mr-4" />
                                                {person.name}
                                              </span>
                                              {selected.name === person.name ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                                                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                              ) : null}
                                            </>
                                          )}
                                        </Listbox.Option>
                                      ))}
                                    </Listbox.Options>
                                  </Transition>
                                </div>
                              </Listbox>
                            </div>
                          </text>
                        </div>
                        <p className="text-md font-semibold text-indigo-600">Thông tin bệnh nhân</p>
                        <div className="grid grid-cols-2 gap-4 mb-2">
                          <text className="block text-sm font-medium leading-6 text-gray-900">Họ tên: </text>
                          <text className="block text-sm font-medium leading-6 text-gray-900">{
                            thongTinHoSo?.hoten
                          }</text>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-2">
                          <text className="block text-sm font-medium leading-6 text-gray-900">Giới tính: </text>
                          <text className="block text-sm font-medium leading-6 text-gray-900">{
                            thongTinHoSo?.gioitinh ? 'Nam' : "Nữ"
                          }</text>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-2">
                          <text className="block text-sm font-medium leading-6 text-gray-900">Ngày sinh: </text>
                          <text className="block text-sm font-medium leading-6 text-gray-900">{
                            formatDate(new Date(thongTinHoSo?.ngaysinh))
                          }</text>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-2">
                          <text className="block text-sm font-medium leading-6 text-gray-900">Địa chỉ: </text>
                          <text className="block text-sm font-medium leading-6 text-gray-900">{
                            thongTinHoSo?.diachi
                          }</text>
                        </div>
                        <p className="text-md font-semibold text-indigo-600">Thông tin đặt lịch</p>
                        <div className="grid grid-cols-2 gap-4 mb-2">
                          <text className="block text-sm font-medium leading-6 text-gray-900">Khoa khám bệnh: </text>
                          <text className="block text-sm font-medium leading-6 text-gray-900">{
                            chuyenkhoa?.find((item: any) => item?._id === khoakhamid)?.tenchuyenkhoa
                          }</text>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-2">
                          <text className="block text-sm font-medium leading-6 text-gray-900">Ngày khám: </text>
                          <text className="block text-sm font-medium leading-6 text-gray-900">{
                            ngaykham && getCurrentDateInputDDMMYYY(ngaykham)

                          }</text>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-2">
                          <text className="block text-sm font-medium leading-6 text-gray-900">Khung giờ khám: </text>
                          <text className="block text-sm font-medium leading-6 text-gray-900">
                            {khungGioKhamServer?.find((item: any) => item?.giatri === khunggiokham)?.khunggiokham
                            }</text>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-2">
                          <text className="block text-sm font-medium leading-6 text-gray-900">Triệu chứng: </text>
                          <text className="block text-sm font-medium leading-6 text-gray-900">
                            {xacNhan?.trieuchung}
                          </text>
                        </div>


                      </div>
                    </div>
                  </div>


                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-x-4">
                    <button
                      type="submit"
                      className="mt-3 inline-flex w-full justify-center rounded-md 
                        bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 
                        ring-inset ring-gray-200 sm:mt-0 sm:w-auto"
                      onClick={() => submitDatlich(xacNhan)}
                    >
                      Thanh toán ngay
                    </button>
                  </div>

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <Footer />
    </div>
  );
}
