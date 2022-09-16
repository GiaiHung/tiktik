import { useRouter } from "next/router";

export default function useForceReload(query: string) {
    const router = useRouter()

    router.push(query)
    router.reload()

    return null
}