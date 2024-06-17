import { ClipLoader, GridLoader, PulseLoader } from "react-spinners";


export const WaitLoader = ({ loading, offset }) => {
    return <PulseLoader loading={loading} color={"#112c85"} size={30} style={{ position: "absolute", left: `${offset[0]}%`, top: `${offset[1]}%`, transform: "translate(-50%,-50%)", zIndex: "10" }} />
}