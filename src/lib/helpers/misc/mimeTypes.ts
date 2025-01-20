export function mapMimeTypesToFriendlyNames(mimeTypes: App.Components.Field.MimeType[]) {
	return mimeTypes.map((mimeType) => {
		for (let key in mimeTypeDictionary) {
			if (mimeTypeDictionary[key] === mimeType) {
				return key;
			}
		}
		return mimeType; // Fallback to the MIME type if no friendly name is found
	});
}

const mimeTypeDictionary: Record<string, App.Components.Field.MimeType> = {
	Image: 'image/*',
	Audio: 'audio/*',
	Video: 'video/*',
	PNG: 'image/png',
	JPEG: 'image/jpeg',
	GIF: 'image/gif',
	SVG: 'image/svg+xml',
	WebP: 'image/webp',
	MP3: 'audio/mpeg',
	WAV: 'audio/wav',
	OGG: 'audio/ogg',
	MP4: 'video/mp4',
	WebM: 'video/webm',
	AVI: 'video/x-msvideo',
	MOV: 'video/quicktime',
	FLV: 'video/x-flv',
	DOC: 'application/msword',
	DOCX: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	PDF: 'application/pdf',
	PPT: 'application/vnd.ms-powerpoint',
	PPTX: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
	XLS: 'application/vnd.ms-excel',
	XLSX: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
	TXT: 'text/plain',
	CSV: 'text/csv',
	HTML: 'text/html',
	JS: 'text/javascript'
};
