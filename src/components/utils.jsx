function applyProps(Fn, props) {
    return (e = {}) => <Fn {...e} {...props} />
}

export { applyProps }