<?php
// hide theme settings from admin top bar
function thegem_admin_bar_site_menu_remove() {
    remove_action('admin_bar_menu', 'thegem_admin_bar_site_menu', 100);
    remove_action('admin_bar_menu', 'thegem_admin_bar_thumbnails_generator', 101);
}
add_action('init', 'thegem_admin_bar_site_menu_remove');

// shortcode for activation
// [activation]

function aim_activation() {
    if($_POST['submit']) {
        // echo 'douleyei';
        //
// This comes from your Winlicense program. It'll be BIG! 
//
$hash = 'KyhB061eiFW9k7uDV257y2UBG1rmWM7a20j2nsqvEQiVmVwgY6RUH872EiHikvAZsslw4XI57O50tW96qMFMv24kmIWjM7VDvkztDJye069lsM584zoDhxmyb9eGo4cO4CmAC88o9jSlY0U4da42gfffbfffb020100028180969d28abe109865a7a46c2417f3bc9421d1c44ec57dcfd46a76295f1322ac1f76af5bfe614570386c0c545d0fbc8f26dc8276e1bee51be861cf9af897aacfb97121106ac8e6c6a7a50744a11370f6a6b4678d044fa03fc451270be3b5cb0491ffb7325ca3589cd4fab7af5dc35d102470c17ff01ea44e873d553fd4543fbe55102030100010281800aacf41528623359d63ac1238df3499c95c4a4e59db78630bf2c5fa23b896221acbd16c2bfb1553bc17466ff5d41735e6419a4fca9a3b57794b5ff3625586425faa435cd3be57756f80c1fd46bea60189dfd277efba4e6465de16499b8a5d32e3f200883ed7e056250a1b96da204a8ec7674b77d57d3e02164e45d85cdd05c130240b0ae9509dd8effd4adadd7fd5c82a2e9310f66bc463c68be435ab88e65e5f6901fcb8424420264a4cfce1597d29ceb0420309e514f1d48155918d9d3db927de70240da3aab443d26cc61b83acb423866c945a55a8fa276b6b90662611ab734ca9b85df330fc962e16494f21a497d70959f0cc5a5e0a969d0737a84aa3d028d9b6c07024100534c5bf3e4c3309662b3dd6b141c7b161a0d3ad07504b21551c809cf08f79c81629c1ed6c1504386f87a1ef00f59efeb6809c3fa6da44e81d219c748fcf259ed02400c9ec3f4c84c8c19429c33d0fa8e0729bdec44ce326b52bbe9c88fd0f47e9b0bdce289112e64b67a5e9de28e1c8aaa8e0488193bf2e0992d06ab09a8322440d50241006636afc3ebe3d8d6cd3561ff32bfcd77c1dfb9cd8364f7f7d54b8b9c8c41828908e889514700c6362ff1aa2492e764a512e060af45ee20c55ad9137116aca804fffefffe02010002820101007016f5f2c334ebf823b705687810a69615700a4cc07dcf4c6845c60bad63d3cc2b0f6dc6ccb5e29b961cc0f717e32c9f2c861c51f48fbb332da3afdc5802cee6f5ec2028539dbce84210c557d0570d0163eae86f87f2fb8e751909d6b7682ffcf5602f630f1106df138612f3f65d99f0a428960d4a22a3da991063de43fa02e72430d13a7ec6ba4b6736dbd3e23176649e578a7bad4ed7eece45b93cb0e9ffd6e343df7549792881e39c6e48d11e4252d427e152c4cbcf4c357f495e6d9cea19c73756a08bb541ce5599bd533eac859ff6873fbcb587fc09e6b060add1adef66f49faae8b8924b739467a2692460bb05dee8d4e2324a4ecb10f79a09f26d75d30203010001028201002b752b7c28a4df0c00c4d7caee29fe7c57e96d84de68a8b38605ef47ddbcc383f7f9ee64d23f7e9135fd05ef870a63e57ebcac44361e77c4dae008b1d4499a703f4e8215407dfa9ccde874aa9c32f3eee30f5378d26ba98e4ce61d436b2e70d49149ee756885007602bacba45c9363b8c1dc9e789e9299968a1ba9aca60c4b8d4cef0121acf031d5518c946a6f50a837a46cfd9ff94aba1145c0ff06fdb382c55f70fef09c538f89a1a4e0fdea34736a27764e40155801e6a2d407b884b17564a926d9480f9336bea6d63a3b8d9e81d510e633ae9890856321495dd237592551a612880732bb1526927d8788cb9b3d70c5e75732110eebecb2a8d4ec1f27122102818085116925e395b30227818d701aa16a6ca54f52cb1c9e9ad3c17aea6965277a46141222119968262ef9c4102154bc2b997319a766f54c05853b13f718e9e58631bb70ed5f25183cca59798400c0a474ca619855cef2546d5c7ef5484fe1110d2fe0b24dd82bbf0e7b3faae29dd5873b467b75c50df4f7ea8e979a579329297811028180d7a42d2f2c7a0e3b9a6d13e213133d81575c0add9a1f2ecf1aea36e455f600484bd49c7527c9b7f2711e8e1aa3571497992b6d4f8751da5fe974bc72bf73c8f58d2295a333b364b0d420f044f67d58a4f39df4351cc4bb1f593cdcbf0d813878831ada1714cbfc386c3b4873548819eaf0a1b57888645da6a158e94f2e10d3a302818100485e51ab137cc49ff55055d594061955010a84e285ac1453f9b3996cbc609df522d141ca047e49d5de6c2cc193cdca8067c299f23a919fa6f79c421440905d4d0abdbdbab2f7dd87c6e5794ed77619363fa193793afd83847c5f75764bd6f42f07aab0ff51bb546adf1356afb40319cf9931517be7b034d65bc8cabbf3f4e3a102818020f3fecfa9ad51457c78d4c40484392eedc9ac03674d029b3592bb26b3982f3cdd11b58315bc76b6bee09b78a8a3630b33a5f64363fb773296fb76dcd632fc6fc1cc9a2f6174359bec1ec878d16e2040bcd5d37ed6519e02d161429e9392bead73e3839669602ebff4922ea52932cf3b1ee0a759af061f659a5c7af2d5a84e9f02818100559c0eb3e189727ef3ad6065f07d30944130d19ab4db00d51be952165bb8b147e7b42f39ad3fedf08ab2119139e352042a84202719687e01a2hha8554a1c229574a8baf166a6962c591b000f20fdf8525a91de3967cf184493e0a3eb712ca39f60b0275cc4d89fdb8a2235bb5072c3b40670e548ed742f24c91c3c86ebdf4024';

//
// If these variables aren't there then it wasn't Plimus calling the script
//
// if ( !isset($_POST['nm']) OR string_empty($_POST['nm']) ) {
// 	die("Error 1. Please email support@youraddress.com");
// }

// if ( !isset($_POST['co']) ) {
// 	die("Error 2. Please email support@youraddress.com");
// }

//
// This is where you'll start changing $_GET to $_POST if you want to use it instead
//
// print_r ('ti gibnetai'); die;
$days = $_POST['nm'];
$hwid = $_POST['co'];

$days = stripslashes(urldecode($days));
$hwid = stripslashes(urldecode($hwid));

$output = shell_exec('/mnt/c/Windows/System32/cmd.exe /C activation/GenTest.exe'. $days . $hwid);
echo "<pre>$output</pre>";
      } else { ?>
        <form id="formid" action="" method="POST">
          <input type="text" name="nm" value="" />
          <input type="text" name="co" value="" />
          <input type="submit" name="submit" value="submit" />
        </form>
     <?php }
    // return $out;
 }
 add_shortcode( 'activation', 'aim_activation' );

//  add new tabs to my-account -> activation and tickets
// https://businessbloomer.com/woocommerce-add-new-tab-account-page/
// ------------------
// 1. Register new endpoints to use for My Account page
// Note: Resave Permalinks or it will give 404 error
  
function bbloomer_add_product_activation_endpoint() {
    add_rewrite_endpoint( 'product-activation', EP_ROOT | EP_PAGES );
}
function bbloomer_add_premium_support_endpoint() {
    add_rewrite_endpoint( 'premium-support', EP_ROOT | EP_PAGES );
}
  
add_action( 'init', 'bbloomer_add_product_activation_endpoint' );
add_action( 'init', 'bbloomer_add_premium_support_endpoint' );
  
  
// ------------------
// 2. Add new query var
  
function bbloomer_product_activation_query_vars( $vars ) {
    $vars[] = 'product-activation';
    return $vars;
}
function bbloomer_premium_support_query_vars( $vars ) {
    $vars[] = 'premium-support';
    return $vars;
}
  
add_filter( 'query_vars', 'bbloomer_premium_support_query_vars', 0 );
add_filter( 'query_vars', 'bbloomer_product_activation_query_vars', 0 );
  
  
// ------------------
// 3. Insert the new endpoint into the My Account menu
  
function bbloomer_add_product_activation_link_my_account( $items ) {
    $items['product-activation'] = 'Product License';
    return $items;
}
function bbloomer_add_premium_support_link_my_account( $items ) {
    $items['premium-support'] = 'Premium Support';
    return $items;
}
  
add_filter( 'woocommerce_account_menu_items', 'bbloomer_add_premium_support_link_my_account', 5 );
add_filter( 'woocommerce_account_menu_items', 'bbloomer_add_product_activation_link_my_account', 6 );  
  
// ------------------
// 4. Add content to the new endpoint
  
function bbloomer_product_activation_content() {
echo '<h3>Aimsharp Product Activation</h3><p>Welcome to the product activation area. <i>Please contact us or create a <a href="/my-account/premium-support/" target="_blank">ticket</a> if you need any further assistance</i></p>';
echo do_shortcode( '[contact-form-7 id="1591"]' );
}
function bbloomer_premium_support_content() {
    echo '<h3>Aimsharp Premium Support</h3><p>Welcome to the premium support area.</p>';
    echo do_shortcode( '[tickets]' );
    }
  
add_action( 'woocommerce_account_premium-support_endpoint', 'bbloomer_premium_support_content' );
add_action( 'woocommerce_account_product-activation_endpoint', 'bbloomer_product_activation_content' );
// Note: add_action must follow 'woocommerce_account_{your-endpoint-slug}_endpoint' format

// hide some tabs
// https://businessbloomer.com/woocommerce-hide-rename-account-tab/
add_filter( 'woocommerce_account_menu_items', 'bbloomer_remove_address_my_account', 999 );
add_filter( 'woocommerce_account_menu_items', 'bbloomer_remove_account_details_my_account', 999 );
add_filter( 'woocommerce_account_menu_items', 'bbloomer_remove_downloads_my_account', 999 );
 
function bbloomer_remove_address_my_account( $items ) {
unset($items['edit-address']);
return $items;
}
function bbloomer_remove_account_details_my_account( $items ) {
unset($items['edit-account']);
return $items;
}
function bbloomer_remove_downloads_my_account( $items ) {
unset($items['downloads']);
return $items;
}

// add gogole font
function wpb_add_google_fonts() {
 
    wp_enqueue_style( 'wpb-google-fonts', 'https://fonts.googleapis.com/css?family=Audiowide&display=swap', false ); 
    }
     
    add_action( 'wp_enqueue_scripts', 'wpb_add_google_fonts' );

/**
 * Redirect to Checkout Upon Add to Cart - WooCommerce
 */ 
add_filter( 'woocommerce_add_to_cart_redirect', 'bbloomer_redirect_checkout_add_cart' );
function bbloomer_redirect_checkout_add_cart() {
   return wc_get_checkout_url();
}

/**
 * Register js for play video when in viewport
 * https://alextade.me/codesnips/play-video-viewport
 */
add_action('wp_enqueue_scripts', function () {
 wp_enqueue_script('autoplayvid', get_stylesheet_directory_uri() . '/js/inview.js');
    });


    
/**
 * Register js for electric border TO FOOTER IN ORDER TO WORK
 * https://codepen.io/shshaw/pen/MvMyZg
 * https://wordpress.org/support/topic/adding-js-file-to-footer-using-enqueue/
 */
// add_action('wp_enqueue_scripts', function () {
//     wp_enqueue_script('electricborder', get_stylesheet_directory_uri() . '/js/electricborder.js', array(), false, true);
//        });


