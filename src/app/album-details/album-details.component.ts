import { Component, OnInit } from '@angular/core';
import {Album, Photo} from "../models";
import {ActivatedRoute} from "@angular/router";
import {Location} from '@angular/common';
import {AlbumsService} from '../albums.service';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.css']
})
export class AlbumDetailsComponent implements OnInit {
  album: Album;
  loading: boolean;
  photos: Photo[];

  constructor(private route: ActivatedRoute,
              private location: Location,
              private albumsService: AlbumsService) { }

  ngOnInit(): void {
    // this.getPhotos();
    // const  id = +this.route.snapshot.paramMap.get('id');
    // this.album = ALBUMS.find((x) => x.id === id);
    this.route.paramMap.subscribe((params) => {
      const  id = +params.get('id');
      this.getAlbum(id);
      // this.album = ALBUMS.find((x) => x.id === id);
    });
  }

  getAlbum(id: number): void{
    this.loading = true;
    this.albumsService.getAlbum(id).subscribe((album) => {
      this.album = album;
      this.loading = false;
    });
  }

  goBack(): void {
    this.location.back();
  }

  updateAlbum(): void {
    this.albumsService.updateAlbum(this.album).subscribe(() => this.goBack());
  }

  // getPhotos(): void{
  //   this.loading = true;
  //   this.albumsService.getPhotos(this.album.id).subscribe((photos) => {
  //     this.photos = photos;
  //     this.loading = false;
  //   });
  // }

}
