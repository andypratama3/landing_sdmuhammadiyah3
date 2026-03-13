
export type VerifyStatus = "valid" | "not_found" | "expired" | "revoked"

export interface SignatureData {
    label: string
    description: string | null
    issued_to: string
    issued_by: string
    document_type: string
    valid_from: string | null   // null-safe, karena bisa belum diisi
    valid_until: string | null
    scan_count: number
    status_label: string
    file_url: string | null
}

export interface Signature {
    status: VerifyStatus
    message: string
    data: SignatureData | null
}

export interface RawApiResponse {
    success: boolean
    message: string
    data: {
        status: VerifyStatus
        data: SignatureData | null
    } | null
}