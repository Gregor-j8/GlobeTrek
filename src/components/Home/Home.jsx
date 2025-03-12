import { Globe } from "../../Documents/Globe"

export const Home = () => {
    return (
        <div className="w-full">
            <div className="mt-10 flex flex-col items-center">
                <h1 >Welcome Current User</h1>
            <section>
                <video loop autoPlay width="900" src={Globe()}></video>
            </section>
            </div>
        </div>
    )
}
