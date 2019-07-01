import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';


declare interface loginInfo <T> {
  msg: string;
  user: {userInfo: T, userStatus:any};
  isLogin: any;
}

declare interface anggota {
  alamat:string    
  email:string
  jenis_kelamin:string
  kode_anggota:any;
  nama_lengkap:string;
  nomor_handphone:any;
  serial_id:any;
  status:any;
}

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  apiUrl:string = 'http://localhost/api-mbaku/public/api/v1/';
  public url:string = 'http://localhost/api-mbaku/';
  header:any = new HttpHeaders().append('Content-Type', 'application/json');
  constructor(public http: HttpClient, public snackBar: MatSnackBar) { }

  showMessage(message: string, action: string='Close') {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  getDataBuku(criteria:any){
    return this.http.get(this.apiUrl + `dashboard/getBookList?pageIndex=${criteria.pageIndex}&pageSize=${criteria.pageSize}&sortBy=${criteria.sortBy}&category=${criteria.category}&keyword=${criteria.keyword}`);
  }

  getDataAnggota(criteria:any){
    return this.http.get(this.apiUrl + `anggota?pageIndex=${criteria.pageIndex}&pageSize=${criteria.pageSize}&sortBy=${criteria.sortBy}&category=${criteria.category}&keyword=${criteria.keyword}`);
  }

  getDataTransaction(criteria:any){
    return this.http.get(this.apiUrl + `transaksi?pageIndex=${criteria.pageIndex}&pageSize=${criteria.pageSize}&sortBy=${criteria.sortBy}&category=${criteria.category}&keyword=${criteria.keyword}&status=${criteria.status}`);
  }

  getCategories(){
    return this.http.get(this.apiUrl + `dashboard/getCategories`);
  }

  getSummary(){
    return this.http.get(this.apiUrl + `dashboard/admin`);
  }

  getDetailBook(id){
    return this.http.get(this.apiUrl + `book/detail/${id}`);
  }

  processLogin(criteria:any){
    return this.http.post<loginInfo<anggota>>(this.apiUrl + `login`,JSON.stringify(criteria),{headers:this.header});
  }

  registerAnggota(criteria:any){
    return this.http.post(this.apiUrl + `anggota/daftar`,JSON.stringify(criteria),{headers:this.header});
  }

  registerAccount(criteria:any){
    return this.http.post(this.apiUrl + `anggota/account/register`,JSON.stringify(criteria),{headers:this.header});
  }

  updateAccount(criteria:any){

    const formData = new FormData();

    formData.append('serial_id', criteria.serial_id);
    formData.append('kode_anggota', criteria.kode_anggota);
    formData.append('nama_lengkap', criteria.nama_lengkap);
    formData.append('alamat', criteria.alamat);
    formData.append('nomor_handphone', criteria.nomor_handphone);
    formData.append('email', criteria.email);
    formData.append('status', criteria.status);
    formData.append('photo', criteria.photo);
   
    return this.http.post(this.apiUrl + `anggota/account/update`,formData);
  }

  getListByAnggota(criteria:any){
    return this.http.post(this.apiUrl + `transaksi/getListByAnggota`,JSON.stringify(criteria),{headers:this.header});
  }

  saveTransaction(criteria:any){
    return this.http.post(this.apiUrl + `transaksi/store`,JSON.stringify(criteria),{headers:this.header});
  }

  detailAccount(kode_anggota:any){
    return this.http.get(this.apiUrl + `anggota/account/detail/${kode_anggota}`);
  }

  deleteAnggota(id:any){
    return this.http.delete(this.apiUrl + `anggota/delete/${id}`);
  }

  deleteBook(id:any){
    return this.http.delete(this.apiUrl + `book/delete/${id}`);
  }

  downloadImage(url: string) {
    return this.http.get(url, { responseType: 'blob' });
  }

  getBookByCategory(kode_kategori){
    return this.http.get(this.apiUrl + `book/getBookByCategory/${kode_kategori}`);
  }

  getPopularBook(){
    return this.http.get(this.apiUrl + `book/getPopularBook`);
  }

  getFile(filename: string) {
    return this.http.post(this.apiUrl + 'book/getEbook',{filename: filename},{responseType : 'blob'});
  }

  bookStore(criteria, serialId:any) {
    const formData = new FormData();

    formData.append('kode_buku', criteria.kode_buku);
    formData.append('judul', criteria.judul);
    formData.append('kode_kategori', criteria.kode_kategori);
    formData.append('sinopsis', criteria.sinopsis);
    formData.append('pengarang', criteria.pengarang);
    formData.append('penerbit', criteria.penerbit);
    formData.append('tahun_terbit', criteria.tahun_terbit);
    formData.append('stok', criteria.stok);
    formData.append('jumlah', criteria.jumlah);
    formData.append('ebook', criteria.ebook);
    formData.append('path_image', criteria.path_image);
    
    if(serialId){
      formData.append('isUpdate', 'true');
      formData.append('serial_id', serialId);
    }

    return this.http.post(this.apiUrl + 'book/store',formData);
  }
}
