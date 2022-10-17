import { DanhSachGhe } from "../page/DuLieuGhe";
const initialState = {
    thongTinGhe: DanhSachGhe,
    gheDat: [],
};
export const DatVeReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CHON_GHE":
            const gheCapNhap = [...state.gheDat]
            const index = gheCapNhap.findIndex((item) => {
                return item.soGhe === action.array.soGhe
            })
            if (index != -1) {
                gheCapNhap.splice(index, 1)
            } else {
                gheCapNhap.push(action.array)
            }
            state.gheDat = gheCapNhap
            return { ...state }
        case "XOA_GHE":
            state.gheDat = [...state.gheDat.filter((item) => {
                return item.soGhe !== action.obj.soGhe
            })]
            return { ...state }
        case "DAT_VE":
            // const danhSachGheCapNhap = [...state.DanhSachGhe.map((item) => {
            //     if (item.soGhe === action.danhSach.soGhe) {
            //         state.DanhSachGhe.splice(item.soGhe)
            //     }
            // })]
            // console.log(danhSachGheCapNhap, "ok không")


            // state.thongTinGhe = [...state.thongTinGhe, action.danhSach]
            return { ...state }
        default:
            return { ...state }

    }

}