import React, { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import "./../../app/globals.css";
import axios from "axios";
import Header from "@/components/Heaser";
import Footer from "@/components/footer";
import { useForm } from "react-hook-form";
import SectionDanhSachbenhNhan from "./SectionDanhSachHoSoBenh";
export default function DatLichKham() {
  const [open, setOpen] = useState(false);
  const refDropzone = React.useRef<any>()
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    const values = {
      ...data,
      gioitinh: data.gioitinh === 'true' ? true : false,
      ngaysinh: new Date(data.ngaysinh)
    }
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify(values);
      console.log(body);
      if (typeof window !== 'undefined') {
        const item: any = JSON.parse(localStorage.getItem('benhnhan')) || ''
        const res = await axios.post(
          `http://localhost:5000/api/thongtinbenhnhan/themthongtinbenhnhan/${item?.id}`,
          body,
          config
        );
        refDropzone.current.getData()
        setOpen(false)
      }
    } catch (err) {
      console.log(err);
    }

  }
  const cancelButtonRef = useRef(null);
  return (
    <div className="bg-white">
      <Header />

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
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <Dialog.Title
                        as="h2"
                        className=" text-lg text-base font-semibold leading-6 text-indigo-600"
                      >
                        Hồ sơ bệnh nhân
                      </Dialog.Title>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="username"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Họ tên
                          </label>

                          <input
                            type="text"
                            id="username"
                            autoComplete="username"
                            {...register("hoten", { required: true, minLength: 3, maxLength: 50 })}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 pl-2
                            ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 
                            sm:text-sm sm:leading-6"
                          />
                          {errors.hoten && errors.hoten.type === "minLength" && (
                            <p className="text-red-700 text-sm">
                              Họ và tên phải lớn hơn 3 ký tự
                            </p>
                          )}
                          {errors.hoten && errors.hoten.type === "maxLength" && (
                            <p className="text-red-700 text-sm">
                              Họ và tên phải nhỏ hơn 50 ký tự
                            </p>
                          )}
                          {errors.hoten && errors.hoten.type === "required" && (
                            <p className="text-red-700 text-sm">
                              Họ và tên phải bắt buộc nhập
                            </p>
                          )}
                        </div>
                        <div>
                          <label
                            htmlFor="username"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Số bảo hiểm y tế
                          </label>

                          <input
                            type="text"
                            id="soBHYT"
                            {...register("soBHYT", { minLength: 15, maxLength: 15 })}
                            autoComplete="soBHYT"
                            className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {errors.soBHYT && errors.soBHYT.type === "minLength" && (
                            <p className="text-red-700 text-sm">
                              Số thẻ bảo hiểm y tế có 15 ký tự
                            </p>
                          )}
                          {errors.soBHYT && errors.soBHYT.type === "maxLength" && (
                            <p className="text-red-700 text-sm">
                              Số thẻ bảo hiểm y tế có 15 ký tự
                            </p>
                          )}

                        </div>
                        <div>
                          <label
                            htmlFor="date"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Ngày sinh
                          </label>
                          <input
                            data-date-format="DD MMMM YYYY"
                            type="date"
                            data-date=""
                            placeholder="dd/mm/yyyy"
                            id="username"
                            pattern="\d{2}/\d{2}/\d{4}"
                            {...register("ngaysinh")}
                            className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
                            ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                             focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="sex"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Giới tính
                          </label>
                          <div className="flex justify-start">

                            <div className="mb-2 block min-h-2 pl-2 mr-4">
                              <input
                                className="relative float-left -ml-2 mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                type="radio"
                                id="radioDefault01"
                                value={"true"}
                                {...register("gioitinh")}
                              />
                              <label
                                className="mt-px text-black inline-block pl-2 hover:cursor-pointer"
                                htmlFor="radioDefault01"
                              >
                                Nam
                              </label>
                            </div>
                            <div className="mb-2 block min-h-2 pl-2">
                              <input
                                className="relative float-left -ml-2 mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                type="radio"
                                id="radioDefault02"
                                value={"false"}
                                {...register("gioitinh")}
                              />
                              <label
                                className="mt-px  text-black inline-block pl-2 hover:cursor-pointer"
                                htmlFor="radioDefault02"
                              >
                                Nữ
                              </label>
                            </div>
                          </div>

                        </div>
                        <div className="col-span-full">
                          <label
                            htmlFor="username"
                            className="block pl-2 text-sm font-medium leading-6 text-gray-900"
                          >
                            Nghề nghiệp
                          </label>

                          <input
                            type="text"
                            id="nghenghiep"
                            {...register("nghenghiep")}
                            autoComplete="nghenghiep"
                            className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                        <div className="col-span-full">
                          <label
                            htmlFor="about"
                            className="block pl-2 text-sm font-medium leading-6 text-gray-900"
                          >
                            Địa chỉ
                          </label>
                          <div className="mt-2">
                            <textarea
                              id="diachi"
                              rows={3}
                              {...register("diachi")}
                              className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              defaultValue={""}
                            />
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
                        ref={cancelButtonRef}
                      >
                        Thêm hồ sơ
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
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <main className="w-full">
        <div className="bg-gray-200">
          <section className="cover bg-gray-200 relative bg-white px-4 sm:px-8 lg:px-16 xl:px-40 2xl:px-64 overflow-hidden py-4">
            <p className="text-indigo-600 text-2xl font-bold">DANH SÁCH HỒ SƠ BỆNH ÁN</p>
            <button
              className="my-4 px-4 py-3 text-md font-bold text-white bg-orange-600 rounded-md border-solid 
            border-2 border-orange-600"
              onClick={() => {
                setOpen(true);
              }}
            >
              Tạo hồ sơ mới
            </button>
            <SectionDanhSachbenhNhan ref={refDropzone} />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
