// utils/validasi.js
function validasiData(formData) {
    const { name, gender, phone, birthdate, address, email, complain, meetingDate, nama_dokter } = formData;

    // Validasi: Memastikan tidak ada field yang kosong
    if (!name || !gender || !phone || !birthdate || !address || !email || !complain || !meetingDate || !nama_dokter) {
        return { valid: false, message: 'Mohon isi semua field.' };
    }

    // Validasi: Memastikan meeting date tidak dipilih pada masa lampau
    const now = new Date();
    const selectedMeetingDate = new Date(meetingDate);
    if (selectedMeetingDate < now) {
        return { valid: false, message: 'Mohon pilih meeting date yang valid.' };
    }

    // Validasi: Memastikan birthdate dipilih pada masa lampau
    const selectedBirthdate = new Date(birthdate);
    if (selectedBirthdate >= now) {
        return { valid: false, message: 'Mohon masukkan tanggal lahir yang valid.' };
    }

    // Validasi: Memastikan nama tidak mengandung angka
    if (/\d/.test(name)) {
        return { valid: false, message: 'Nama tidak boleh mengandung angka.' };
    }

    return { valid: true };
}

module.exports = validasiData;