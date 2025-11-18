const allowedTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export function validateFiletype(filetype: string) {
    return allowedTypes.includes(filetype);
}

export function getFileExtenstionByType(filetype: string) {
    switch (filetype) {
        case "application/pdf":
            return "pdf";
    }

    throw new Error("Unsupported file type")
}
