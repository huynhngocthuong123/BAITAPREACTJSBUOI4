import React, { Fragment, useState } from 'react'
import "./UIDatVe.css"
import { DanhSachGhe } from './DuLieuGhe'
import { useDispatch, useSelector } from "react-redux"
import { DatVeReducer } from '../redux/datVeReducer'
export default function UIDatVe() {
    let { gheDat, thongTinGhe } = useSelector((state) => state.DatVeReducer)
    console.log(gheDat, "du lieu dat")
    console.log(thongTinGhe, "thông tin ghe")
    const dispatch = useDispatch()
    const DSgheNew = thongTinGhe.filter((item) => {
        return item.hang !== ""
    });

    const renderGhe = () => {
        return DSgheNew.map((item, index) => {
            return <div className='flex' key={index}>
                <h1 className='firstChar'>{item.hang}</h1>
                {item.danhSachGhe.map((ghe, index) => {
                    const gheDaDat = ghe.daDat ? "gheDuocChon" : "";
                    const indexgheDangChon = gheDat.findIndex((item) => {
                        return item.soGhe === ghe.soGhe
                    });
                    return <div type={index}>
                        <button onClick={() => {
                            console.log(ghe)
                            dispatch({
                                type: "CHON_GHE",
                                array: { ...ghe, daDat: "true" }
                            })
                        }} disabled={ghe.daDat} className={`ghe ml-9 ${gheDaDat} ${indexgheDangChon != -1 ? "gheDangChon" : ""}`}> {ghe.soGhe}</button>
                    </div>
                })
                }
            </div >
        })
    }
    const renderVeDat = () => {
        return gheDat.map((item, index) => {
            return <Fragment>
                <tr key={index}>
                    <td className="border-2">{item.soGhe}</td>
                    <td className="border-2">{item.gia.toLocaleString()} vnđ</td>
                    <td className="border-2">
                        <button onClick={() => {
                            console.log(item)
                            dispatch({
                                type: "XOA_GHE",
                                obj: item
                            })
                        }} className="cancel_button">Hủy</button>
                    </td>
                </tr>
            </Fragment>
        })
    }
    return (
        <div className='tickit_movie'>
            <h1 className='text-white text-center title_screen'>ĐẶT VÉ XEM PHIM CYBERLEAR.VN</h1>
            <div className="datve flex">
                <div className="datve_left w-2/3 ml-4">
                    <div className="show_screen">
                        <h1 className='text-white text-center title_screen'>Màn Hình</h1>
                        <div className="screen"></div>
                    </div>
                    <div className='ml-7'>
                        {thongTinGhe[0].danhSachGhe.map((product, index) => {
                            return <div className='inline-block' key={index}>
                                <h1 className='rowNumber'>{product.soGhe}</h1> </div>
                        })}
                    </div>
                    <div>
                        {renderGhe()}
                    </div>
                </div>
                <div className="datve_right p-10 w-1/3 text-center">
                    <div className='modal bg-slate-500'>
                        <h1 className='title_screen text-center ml-8'> Danh Sách Ghế Bạn Đã Chọn</h1>
                        <div className="type_ghe">
                            <div className='ghedangchon flex items-center mb-2'>
                                <h1 className='gheDangChon'></h1>
                                <span className='text-white'>: Ghế Đang Chọn</span>
                            </div>
                            <div className='gheduocchon flex items-center mb-2'>
                                <h1 className='gheDuocChon'></h1>
                                <span className='text-white'>: Ghế Đã Đặt</span>
                            </div>
                            <div className='ghecothechon flex items-center'>
                                <h1 className='ghe'></h1>
                                <span className='text-white'>: Ghế Chưa Đặt</span>
                            </div>
                        </div>
                        <table className="table-auto mt-3">
                            <thead>
                                <tr>
                                    <th style={{ width: "220px" }} className="border-2">Số Ghế</th>
                                    <th style={{ width: "200px" }} className="border-2">Hủy</th>
                                    <th style={{ width: "100px" }} className="border-2">Giá</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderVeDat()}
                                <tr>
                                    <td className="border-2">Tổng Tiền</td>
                                    <td className="border-2">{gheDat.reduce((tongTien, item, index) => {
                                        return tongTien += item.gia
                                    }, 0).toLocaleString()} vnđ</td>
                                    <td className="border-2"> <button type='submit' onClick={() => {
                                        dispatch({
                                            type: "DAT_VE",
                                            danhSach: gheDat
                                        })
                                    }} className='btn_thanhtoan'>Thanh Toán</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div >
    )
}
