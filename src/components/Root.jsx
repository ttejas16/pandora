import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { getRandomNumFrom } from "../utils/random";
import { Outlet } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import Progress from "./Progress";
import Cursor from "./Cursor";
import { useProgress } from "@react-three/drei";

function Root() {

    return (
        <>
            <Cursor />
            <Outlet />
        </>
    )
}

export default Root;