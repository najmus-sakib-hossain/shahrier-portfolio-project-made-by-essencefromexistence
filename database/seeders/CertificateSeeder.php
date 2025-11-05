<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Certificate;

class CertificateSeeder extends Seeder
{
    public function run(): void
    {
        $certificates = [
            [
                'title' => 'AWS Solutions Architect',
                'issuer' => 'Amazon Web Services',
                'description' => 'Professional level cloud architecture certification',
                'image' => '/assets/technology/certificate_1.png',
                'certificate_url' => 'https://aws.amazon.com/certification',
                'issue_date' => now()->subYears(2),
                'expiry_date' => now()->addYear(),
                'category' => 'Cloud',
                'order' => 1,
            ],
            [
                'title' => 'Certified Ethical Hacker',
                'issuer' => 'EC-Council',
                'description' => 'Advanced cybersecurity certification',
                'image' => '/assets/technology/certificate_2.png',
                'certificate_url' => 'https://www.eccouncil.org/programs/certified-ethical-hacker-ceh',
                'issue_date' => now()->subYears(3),
                'expiry_date' => null,
                'category' => 'Security',
                'order' => 2,
            ],
            [
                'title' => 'Google Cloud Professional',
                'issuer' => 'Google Cloud',
                'description' => 'Google Cloud Platform professional certification',
                'image' => '/assets/technology/certificate_3.png',
                'certificate_url' => 'https://cloud.google.com/certification',
                'issue_date' => now()->subYear(),
                'expiry_date' => now()->addYears(2),
                'category' => 'Cloud',
                'order' => 3,
            ],
            [
                'title' => 'Professional Scrum Master',
                'issuer' => 'Scrum.org',
                'description' => 'Advanced Scrum and Agile methodology certification',
                'image' => '/assets/technology/certificate_1.png',
                'certificate_url' => 'https://www.scrum.org',
                'issue_date' => now()->subMonths(18),
                'expiry_date' => null,
                'category' => 'Management',
                'order' => 4,
            ],
        ];

        foreach ($certificates as $cert) {
            Certificate::create($cert);
        }
    }
}
