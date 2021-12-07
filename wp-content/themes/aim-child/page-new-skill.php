<?php

get_header(); ?>

<div id="main-content" class="main-content">

<?php
	while ( have_posts() ) : the_post();
        get_template_part( 'content', 'page' );
    endwhile; ?>
<?php if($_POST['submit']) {
            echo 'douleyei';
          } else { ?>
            <form id="formid" action="" method="POST">
              <input type="text" name="inputname" value="" />
              <input type="submit" name="submit" value="submit" />
            </form>
         <?php } ?> 
</div><!-- #main-content -->

<?php
get_footer();
