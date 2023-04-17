import { useEffect } from "react";

const useBodyClass = (className: string, active: boolean) => {
    useEffect(() => {
        if (active) {
            document.body.classList.add(className)
        } else {
            document.body.classList.remove(className)
        }
    }, [className, active])
}

export default useBodyClass;