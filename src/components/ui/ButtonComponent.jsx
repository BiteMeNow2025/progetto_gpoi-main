export default function ButtonComponent ({buttonText, buttonLink, isLight}) {
    return (
        <>
            <a className={"py-2 px-3 text-light" + `${isLight ? " bg-dark text-light " : " bg-light text-dark "}` + "rounded-3 text-decoration-none"} href={buttonLink} target="_blank">{buttonText}</a>
        </>
    )
}