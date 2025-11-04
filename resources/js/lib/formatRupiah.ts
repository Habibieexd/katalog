interface FormatRupiahOptions {
    showSymbol?: boolean;
    minimumFractionDigits?: number;
}

export function formatRupiah(
    value: number | string | null | undefined,
    options: FormatRupiahOptions = {},
): string {
    if (value === null || value === undefined || value === '') return '-';

    const number = typeof value === 'string' ? Number(value) : value;
    if (Number.isNaN(number)) return String(value);

    const { showSymbol = true, minimumFractionDigits = 0 } = options;

    const formatter = new Intl.NumberFormat('id-ID', {
        style: showSymbol ? 'currency' : 'decimal',
        currency: 'IDR',
        minimumFractionDigits,
        maximumFractionDigits: minimumFractionDigits,
    });

    return formatter.format(number);
}
