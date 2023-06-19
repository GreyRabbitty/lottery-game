const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-GB').format(value || 0);
}

const copyText = (value) => {
    return navigator.clipboard.writeText(value);
};

const convertDate = (value) => {
    return new Date(value).toLocaleDateString('en-GB');
}

export {
    formatCurrency,
    copyText,
    convertDate
}
