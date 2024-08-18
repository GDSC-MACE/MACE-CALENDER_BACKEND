import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Get,
  Req,
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { AuthenticatedGuard } from 'src/auth/Guards/authenticated.guard';
import { PostService } from './post.service';
import { PostDto } from './dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(AuthenticatedGuard)
  @Post('createPost')
  async createPost(@Body() dto: PostDto, @Req() req) {
    const user = req.user;
    return this.postService.createPost(dto, user.id);
  }
  @UseGuards(AuthenticatedGuard)
  @Delete(':id')
  async deletePost(@Param('id', ParseIntPipe) postId: number, @Req() req) {
    const user = req.user;
    return this.postService.deletePost(postId, user.id);
  }

  @Get('allposts')
  async fetchallposts() {
    return this.postService.fetchAllPosts();
  }

  @Get('uniqueposts/:id')
  async fetchuniqueposts(@Param('id', ParseIntPipe) id: number) {
    return this.postService.fetchUniquePost(id);
  }
}
