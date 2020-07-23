import {IsString, IsNotEmpty, IsOptional} from 'class-validator'; 
export class ProductsDTO{
@IsNotEmpty()
@IsString()
@IsOptional()
title:string;

@IsNotEmpty()
@IsOptional()
@IsString()
description:string;

@IsNotEmpty()
@IsOptional()
@IsString()
price:string;

}