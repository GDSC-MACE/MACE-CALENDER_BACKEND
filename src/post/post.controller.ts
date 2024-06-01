import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Req,
} from '@nestjs/common';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Post('createPost')
  async createPost(@Body() dto: any, @Req() req) {
    // const user = req.user;
    return this.postService.createPost(dto, 1);
  }

  @Delete(':id')
  async deletePost(@Param('id', ParseIntPipe) postId: number, @Req() req) {
    // const user = req.user;
    return this.postService.deletePost(postId, 1);
  }
}
