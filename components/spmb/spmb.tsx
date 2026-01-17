'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload, ArrowRight, X, Check, AlertCircle } from "lucide-react";
import { Textarea } from '@/components/ui/textarea';
import { useMutation } from "@/hooks/useApi";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  SpmbFormData,
  SpmbFileData,
  SpmbFileNames,
  SpmbFormErrors,
  FileFieldName,
  INITIAL_FORM_DATA,
  INITIAL_FILE_DATA,
  INITIAL_FILE_NAMES,
  FILE_UPLOAD_FIELDS,
  REQUIRED_FORM_FIELDS,
  SPMB_VALIDATION,
} from '@/types/spmb.types';

export function SpmbPage() {
  const [formData, setFormData] = useState<SpmbFormData>(INITIAL_FORM_DATA);
  const [files, setFiles] = useState<SpmbFileData>(INITIAL_FILE_DATA);
  const [fileNames, setFileNames] = useState<SpmbFileNames>(INITIAL_FILE_NAMES);
  const [errors, setErrors] = useState<SpmbFormErrors>({});
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const { mutate, loading, error: apiError } = useMutation<any, FormData>('/spmb/store', 'POST');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value, name } = e.target;
    const fieldName = (name || id) as keyof SpmbFormData;
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
    if (errors[fieldName]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  const handleSelectChange = (value: string, field: keyof SpmbFormData) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: FileFieldName) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > SPMB_VALIDATION.MAX_FILE_SIZE) {
        setErrors(prev => ({
          ...prev,
          [fieldName]: 'Ukuran file maksimal 2MB'
        }));
        return;
      }

      if (!SPMB_VALIDATION.ALLOWED_FILE_TYPES.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          [fieldName]: 'Format file harus PDF, JPG, atau PNG'
        }));
        return;
      }

      setFiles(prev => ({
        ...prev,
        [fieldName]: file
      }));
      setFileNames(prev => ({
        ...prev,
        [fieldName]: file.name
      }));
      
      if (errors[fieldName]) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[fieldName];
          return newErrors;
        });
      }
    }
  };

  const removeFile = (fieldName: FileFieldName) => {
    setFiles(prev => ({
      ...prev,
      [fieldName]: null
    }));
    setFileNames(prev => ({
      ...prev,
      [fieldName]: ''
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: SpmbFormErrors = {};

    REQUIRED_FORM_FIELDS.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'Field ini wajib diisi';
      }
    });

    if (formData.nik && formData.nik.length !== SPMB_VALIDATION.NIK_LENGTH) {
      newErrors.nik = 'NIK harus 16 digit';
    }

    if (formData.no_hp && !SPMB_VALIDATION.PHONE_REGEX.test(formData.no_hp)) {
      newErrors.no_hp = 'Format nomor HP tidak valid (08xxxxxxxxxx)';
    }

    const requiredFiles: FileFieldName[] = ['akta_kelahiran', 'pas_foto', 'kartu_keluarga'];
    requiredFiles.forEach(field => {
      if (!files[field]) {
        newErrors[field] = 'File wajib diupload';
      }
    });

    if (!formData.terms) {
      newErrors.terms = 'Anda harus menyetujui syarat dan ketentuan';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM_DATA);
    setFiles(INITIAL_FILE_DATA);
    setFileNames(INITIAL_FILE_NAMES);
    setErrors({});
  };

  const handleSubmit = async () => {
    setShowSuccess(false);

    if (!validateForm()) {
      return;
    }

    try {
      const submitData = new FormData();

      // Append form fields (excluding terms)
      submitData.append('nama', formData.nama);
      submitData.append('nik', formData.nik);
      submitData.append('tempat_lahir', formData.tempat_lahir);
      submitData.append('tanggal_lahir', formData.tanggal_lahir);
      submitData.append('jenis_kelamin', formData.jenis_kelamin);
      submitData.append('alamat', formData.alamat);
      submitData.append('nama_ayah', formData.nama_ayah);
      submitData.append('pekerjaan_ayah', formData.pekerjaan_ayah);
      submitData.append('nama_ibu', formData.nama_ibu);
      submitData.append('pekerjaan_ibu', formData.pekerjaan_ibu);
      submitData.append('no_hp', formData.no_hp);
      submitData.append('terms', formData.terms ? '1' : '0');
      submitData.append('suku', formData.suku);
      
      
      // Append optional field
      if (formData.asal_tk) {
        submitData.append('asal_tk', formData.asal_tk);
      }

      // Append files
      if (files.akta_kelahiran) {
        submitData.append('akta_kelahiran', files.akta_kelahiran);
      }
      if (files.sttb) {
        submitData.append('sttb', files.sttb);
      }
      if (files.pas_foto) {
        submitData.append('pas_foto', files.pas_foto);
      }
      if (files.kartu_keluarga) {
        submitData.append('kartu_keluarga', files.kartu_keluarga);
      }

      const result = await mutate(submitData as any);

      if (result.success) {
        setShowSuccess(true);
        resetForm();
        const element = document.getElementById('RegisterForm');
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Calon Siswa</CardTitle>
        <CardDescription>Lengkapi semua informasi dengan benar</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {showSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600">
                  <Check className="w-5 h-5" />
                  Pendaftaran Berhasil
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  Data Anda telah tersimpan dengan sukses. Silakan tunggu konfirmasi dari sekolah.
                </p>
                <Button 
                  onClick={() => setShowSuccess(false)} 
                  className="w-full"
                >
                  Tutup
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {apiError && (
          <Alert variant="destructive">
            <AlertCircle className="w-4 h-4" />
            <AlertDescription>{apiError}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-6">
          {/* Nama & NIK */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="nama">Nama Lengkap *</Label>
              <Input
                id="nama"
                placeholder="Nama lengkap sesuai akta"
                value={formData.nama}
                onChange={handleInputChange}
                className={errors.nama ? 'border-red-500' : ''}
              />
              {errors.nama && <p className="text-xs text-red-500">{errors.nama}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="nik">NIK *</Label>
              <Input
                id="nik"
                placeholder="Nomor Induk Kependudukan (16 digit)"
                value={formData.nik}
                onChange={handleInputChange}
                maxLength={16}
                className={errors.nik ? 'border-red-500' : ''}
              />
              {errors.nik && <p className="text-xs text-red-500">{errors.nik}</p>}
            </div>
          </div>

          {/* Tempat & Tanggal Lahir */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="tempat_lahir">Tempat Lahir *</Label>
              <Input
                id="tempat_lahir"
                placeholder="Kota kelahiran"
                value={formData.tempat_lahir}
                onChange={handleInputChange}
                className={errors.tempat_lahir ? 'border-red-500' : ''}
              />
              {errors.tempat_lahir && <p className="text-xs text-red-500">{errors.tempat_lahir}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="tanggal_lahir">Tanggal Lahir *</Label>
              <Input
                id="tanggal_lahir"
                type="date"
                value={formData.tanggal_lahir}
                onChange={handleInputChange}
                className={errors.tanggal_lahir ? 'border-red-500' : ''}
              />
              {errors.tanggal_lahir && <p className="text-xs text-red-500">{errors.tanggal_lahir}</p>}
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="tempat_lahir">Suku *</Label>
              <Input
                id="suku"
                placeholder="Suku"
                value={formData.suku}
                onChange={handleInputChange}
                className={errors.suku ? 'border-red-500' : ''}
              />
              {errors.suku && <p className="text-xs text-red-500">{errors.suku}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="tanggal_lahir">Tanggal Lahir *</Label>
              <Input
                id="tanggal_lahir"
                type="date"
                value={formData.tanggal_lahir}
                onChange={handleInputChange}
                className={errors.tanggal_lahir ? 'border-red-500' : ''}
              />
              {errors.tanggal_lahir && <p className="text-xs text-red-500">{errors.tanggal_lahir}</p>}
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="tempat_lahir">Tempat Lahir *</Label>
              <Input
                id="tempat_lahir"
                placeholder="Kota kelahiran"
                value={formData.tempat_lahir}
                onChange={handleInputChange}
                className={errors.tempat_lahir ? 'border-red-500' : ''}
              />
              {errors.tempat_lahir && <p className="text-xs text-red-500">{errors.tempat_lahir}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="tanggal_lahir">Tanggal Lahir *</Label>
              <Input
                id="tanggal_lahir"
                type="date"
                value={formData.tanggal_lahir}
                onChange={handleInputChange}
                className={errors.tanggal_lahir ? 'border-red-500' : ''}
              />
              {errors.tanggal_lahir && <p className="text-xs text-red-500">{errors.tanggal_lahir}</p>}
            </div>
          </div>

          {/* Jenis Kelamin & Asal TK */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="jenis_kelamin">Jenis Kelamin *</Label>
              <Select value={formData.jenis_kelamin} onValueChange={(value) => handleSelectChange(value, 'jenis_kelamin')}>
                <SelectTrigger id="jenis_kelamin" className={errors.jenis_kelamin ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Pilih jenis kelamin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="laki-laki">Laki-laki</SelectItem>
                  <SelectItem value="perempuan">Perempuan</SelectItem>
                </SelectContent>
              </Select>
              {errors.jenis_kelamin && <p className="text-xs text-red-500">{errors.jenis_kelamin}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="asal_tk">Asal TK</Label>
              <Input
                id="asal_tk"
                placeholder="Nama TK (jika ada)"
                value={formData.asal_tk}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Alamat */}
          <div className="space-y-2">
            <Label htmlFor="alamat">Alamat Lengkap *</Label>
            <Textarea
              id="alamat"
              placeholder="Alamat lengkap tempat tinggal"
              rows={3}
              value={formData.alamat}
              onChange={handleInputChange}
              className={errors.alamat ? 'border-red-500' : ''}
            />
            {errors.alamat && <p className="text-xs text-red-500">{errors.alamat}</p>}
          </div>

          {/* Data Orang Tua */}
          <div className="pt-6 border-t">
            <h3 className="mb-4 text-lg font-semibold">Data Orang Tua</h3>

            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="nama_ayah">Nama Ayah *</Label>
                  <Input
                    id="nama_ayah"
                    placeholder="Nama lengkap ayah"
                    value={formData.nama_ayah}
                    onChange={handleInputChange}
                    className={errors.nama_ayah ? 'border-red-500' : ''}
                  />
                  {errors.nama_ayah && <p className="text-xs text-red-500">{errors.nama_ayah}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pekerjaan_ayah">Pekerjaan Ayah *</Label>
                  <Input
                    id="pekerjaan_ayah"
                    placeholder="Pekerjaan ayah"
                    value={formData.pekerjaan_ayah}
                    onChange={handleInputChange}
                    className={errors.pekerjaan_ayah ? 'border-red-500' : ''}
                  />
                  {errors.pekerjaan_ayah && <p className="text-xs text-red-500">{errors.pekerjaan_ayah}</p>}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="nama_ibu">Nama Ibu *</Label>
                  <Input
                    id="nama_ibu"
                    placeholder="Nama lengkap ibu"
                    value={formData.nama_ibu}
                    onChange={handleInputChange}
                    className={errors.nama_ibu ? 'border-red-500' : ''}
                  />
                  {errors.nama_ibu && <p className="text-xs text-red-500">{errors.nama_ibu}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pekerjaan_ibu">Pekerjaan Ibu *</Label>
                  <Input
                    id="pekerjaan_ibu"
                    placeholder="Pekerjaan ibu"
                    value={formData.pekerjaan_ibu}
                    onChange={handleInputChange}
                    className={errors.pekerjaan_ibu ? 'border-red-500' : ''}
                  />
                  {errors.pekerjaan_ibu && <p className="text-xs text-red-500">{errors.pekerjaan_ibu}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="no_hp">No. WhatsApp Orang Tua *</Label>
                <Input
                  id="no_hp"
                  placeholder="08xxxxxxxxxx"
                  value={formData.no_hp}
                  onChange={handleInputChange}
                  className={errors.no_hp ? 'border-red-500' : ''}
                />
                {errors.no_hp && <p className="text-xs text-red-500">{errors.no_hp}</p>}
              </div>
            </div>
          </div>

          {/* Upload Dokumen */}
          <div className="pt-6 border-t">
            <h3 className="mb-4 text-lg font-semibold">Upload Dokumen</h3>

            {FILE_UPLOAD_FIELDS.map(({ key, label, required }) => (
              <div key={key} className="mt-4 space-y-2">
                <Label>{label} {required && '*'}</Label>
                {!fileNames[key] ? (
                  <label
                    htmlFor={key}
                    className={`block p-6 text-center transition-colors border-2 border-dashed rounded-lg cursor-pointer hover:border-primary ${
                      errors[key] ? 'border-red-500' : ''
                    }`}
                  >
                    <input
                      id={key}
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(e, key)}
                      className="hidden"
                    />
                    <Upload className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                    <p className="mb-1 text-sm font-medium">{label}</p>
                    <p className="text-xs text-muted-foreground">PDF, JPG, PNG (Max. 2MB)</p>
                  </label>
                ) : (
                  <div className="flex items-center justify-between p-4 border rounded-lg bg-muted">
                    <div className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-600" />
                      <span className="text-sm">{fileNames[key]}</span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(key)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
                {errors[key] && <p className="text-xs text-red-500">{errors[key]}</p>}
              </div>
            ))}
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-start pt-4 space-x-2">
            <Checkbox
              id="terms"
              checked={formData.terms}
              onCheckedChange={(checked: boolean) => {
                setFormData(prev => ({ ...prev, terms: checked }));
                if (errors.terms) {
                  setErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors.terms;
                    return newErrors;
                  });
                }
              }}
            />
            <label
              htmlFor="terms"
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Saya menyetujui syarat dan ketentuan yang berlaku serta bersedia mengikuti seluruh program sekolah
            </label>
          </div>
          {errors.terms && <p className="text-xs text-red-500">{errors.terms}</p>}

          {/* Submit Button */}
          <Button onClick={handleSubmit} size="lg" className="w-full" disabled={loading}>
            {loading ? 'Memproses...' : 'Daftar Sekarang'}
            {!loading && <ArrowRight className="w-5 h-5 ml-2" />}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Dengan mendaftar, data Anda akan diproses sesuai kebijakan privasi kami
          </p>
        </div>
      </CardContent>
    </Card>
  );
}