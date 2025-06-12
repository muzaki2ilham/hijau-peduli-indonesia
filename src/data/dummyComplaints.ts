
export const dummyComplaints = [
  {
    id: '1',
    user_id: null,
    name: 'Jane Smith',
    email: 'jane.smith@email.com',
    location: 'Jl. Merdeka No. 123, Jakarta Pusat',
    complaint_type: 'Pencemaran Air',
    description: 'Terdapat pencemaran air di sungai dekat pemukiman warga. Air berubah warna menjadi kehitaman dan berbau tidak sedap. Diduga berasal dari limbah pabrik di sekitar area tersebut.',
    status: 'pending' as const,
    attachments: ['https://example.com/photo1.jpg'],
    admin_response: null,
    created_at: '2024-06-01T10:30:00Z',
    updated_at: '2024-06-01T10:30:00Z'
  },
  {
    id: '2',
    user_id: null,
    name: 'Ahmad Hassan',
    email: 'ahmad.hassan@email.com',
    location: 'Jl. Sudirman No. 456, Jakarta Selatan',
    complaint_type: 'Pencemaran Udara',
    description: 'Asap tebal dan berbau menyengat keluar dari cerobong pabrik setiap pagi dan malam. Hal ini mengganggu kesehatan warga sekitar dan menyebabkan iritasi mata.',
    status: 'in_progress' as const,
    attachments: ['https://example.com/photo2.jpg', 'https://example.com/video1.mp4'],
    admin_response: 'Terima kasih atas laporan Anda. Tim kami sedang melakukan investigasi dan koordinasi dengan pihak terkait.',
    created_at: '2024-06-02T14:15:00Z',
    updated_at: '2024-06-03T09:20:00Z'
  },
  {
    id: '3',
    user_id: null,
    name: 'Siti Nurhaliza',
    email: 'siti.nurhaliza@email.com',
    location: 'Jl. Gatot Subroto No. 789, Jakarta Barat',
    complaint_type: 'Pengelolaan Sampah',
    description: 'Tempat pembuangan sampah sementara di area perumahan sudah penuh dan tidak diangkut selama 3 hari. Sampah berserakan dan menimbulkan bau tidak sedap.',
    status: 'resolved' as const,
    attachments: null,
    admin_response: 'Masalah telah diselesaikan. Sampah sudah diangkut dan jadwal pengangkutan sampah telah diperbaiki.',
    created_at: '2024-06-03T08:45:00Z',
    updated_at: '2024-06-04T16:30:00Z'
  },
  {
    id: '4',
    user_id: null,
    name: 'Budi Santoso',
    email: 'budi.santoso@email.com',
    location: 'Jl. Thamrin No. 321, Jakarta Pusat',
    complaint_type: 'Kebisingan',
    description: 'Suara bising dari konstruksi bangunan yang berlangsung hingga malam hari mengganggu istirahat warga. Aktivitas dimulai dari jam 6 pagi hingga 10 malam.',
    status: 'pending' as const,
    attachments: ['https://example.com/audio1.mp3'],
    admin_response: null,
    created_at: '2024-06-05T19:20:00Z',
    updated_at: '2024-06-05T19:20:00Z'
  },
  {
    id: '5',
    user_id: null,
    name: 'Maria Dewi',
    email: 'maria.dewi@email.com',
    location: 'Jl. Rasuna Said No. 654, Jakarta Selatan',
    complaint_type: 'Pencemaran Tanah',
    description: 'Ditemukan rembesan cairan berminyak di tanah sekitar area industri. Tanah berubah warna dan tumbuhan di sekitar area menjadi layu.',
    status: 'in_progress' as const,
    attachments: ['https://example.com/photo3.jpg'],
    admin_response: 'Laporan sedang dalam proses verifikasi lapangan oleh tim ahli lingkungan.',
    created_at: '2024-06-06T11:10:00Z',
    updated_at: '2024-06-07T13:25:00Z'
  }
];
