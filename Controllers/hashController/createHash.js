var hash = require('../../Models/hash');
var game = require('../../Models/game');
const passport = require("passport");
const jwt = require('../../Middlewares/jwt/jwt');
let crypto = require('crypto');

module.exports.createHash = async (res) => {

    createHash(res,0);
    
}
function createLink() {
    return crypto.randomBytes(128);

}

function createHash(res,number) {
        if (number == 3){
            res.json({msg : 'COULDNT CREATE YOUR HASH' ,success: false,status : 500});
        }
        else {
            let newLink = createLink();
            let password = "Yn&+Snd+#dhE^5_g7Q$8J#TWu_PHRvRML_A3^q@V6gHsY$g&@TbCPw*?Q=pFY*6hA#eqK#wpsuvs%5#wsc4Rd^ak=C?FAy-6QC3YvRcH!M=z8LYHDJmpL=_9=Xm^Q5!#=%f9kxaZbcA&NabcvGNreW!JPZR-cb$CNM4*t%xHkj?@zYB8QYar%^Efv&Tm7-^vZ%4%gJnTM5Z?&@mbt2UC5v2KWn75jsa&mAZ@#v4=*3Pa%$c^R?QGRq7eZ*%nYTm@nw7u7=BTsCFqvb7H34KWV4b5Z^%-%3Gt$JhZ%J7FE_8+42L*=p97_xqxYLaxzxR8szGy8Rt4x$f**Rhfy9fSf2GRUHu&rQ6QVvUJ_s_P$?SDD4e4Q$pk*22M#jfCpjQn#JPV_mTUPt?3h%sCf9Qf*54qSk#vFC##PT7s9P7aS7*jTkQ7bzUd^Cxb%%VK%cUMHYSNkumnxJfSn$a$DFqSA&fQ3+_dp47Q^=UtD@BXv!LPHeS4Lj8*VR4GJ&crZ*$2c#DH#w_Ya5-=BVK6X+BDkp##vfuqUukL6kJg?Dy$w^@JncEAP9+HAb?mgSeHD-g76VeEJ8yWPPk*%_45W?fSJ4vPc=&7QeT8h3LhWMRRu3M$DwSVVRS2mU4VJjr^wx@hy^Dk3jB@whR7ukBA*sm*#g55MaR-LmqC5ZNfNe+L^TufC5XBv_V_?K^Rwd@Z+beyTtKc@-4WxANZQWf$368UBH-KCjuwSUXEV#&_r_?4agdgK?HnN#Dm%HK3fC*AG$372g+E&FsP_J=HAn=^t$Gpb9G6@6k&f5cXe_bQkGQpbgQ3p$q2Czpjhty&jFdhbm2mCYYvcBZzpVk+nQETgb?*_!ZFf4PfYBxRpj-nSTepwLaE#H7TV-uU=hzvM$vHQFHY9@U_$hMK!G7kQLbHTt=65?+B3k6VVRC9p&cZ^VBXy7U%ZNrdskB_WC&xe88UsMNN%xcc2wYKs3rr2ux#D4BCL#9erPfWqW&ru2&Sv^@TQL*9nDmGw9=pd6DzV2Z8zC%9$L-6VLL&Eda-&3w_y3gGD$Zyhq39g?LRdw!WbaDu-^k!j=@Nsbaghdq$j%wVx$2cMnXp@PV*P?zF6**6VF3@$Ca8fhr7Gj=ZTk3sHmd%jGP^9VF6wrjfk7+&f4hu3*DnH+YX56m&Qb3YNX#h*DBNPw7nqh4gf#=CQV4wX5yZeRwR#h4T_+jh^UQYYZXXD9XqqMd&@MKhbX?H2xR4uurmRcJexhfJj&D!!gq=4m3s=jk&6=U3a!BwG6yRJqM?SYALT!f6aV_ua7vJu62_RANe3J#6Jk9eBPJj%Vs3A4YYqAjwD!Prhy#mMr@95uyDerD5Z6CZ7A+NeEbVKdxGU6S44rreW9H4Gp5EvBchTFNdT9-a&JUZsdZ-y@M6VE5rdjHHKmWUue$tTAU3HaSxyHhRP-QUH584hsZxRFn!cE5-WppZMAeSf%htrG^BHS-3#JXBKVTYy2u_7TT3Pw#ezp5%ZkwhjzU6*SakGaTPvVte5_TcM8M6Z^eKjMw+3Xc_TbwvAdmz6+$GCF76wmFR2hNxJsHmPRGC&eh$Fs^yM2dQ#fneE$Xa8-2%p?#3kZQk&CrKKvNG9zgt5HaKGzewJ%J-2xhGY?XBjE&Q5^A9tK3!y46#m*F-MfGWX+NkYzdHa#bp-yLT=qxAUkLEZ9LUKS6!7QeBL&ZsV9LUe*Ht#8XmpH+@hBpX$uAgcca%=rQdXL5-bx3psM4&tB_VhQ6KjP-n4w9kfDtCD_rG^9Ve9HGyD&LTxbwhSTxFW&PQ+&fL58njDSHY=sM@2M%tHHDk3&p6n=38DHxkA*BXKPaHnvT4yvmPtC243rgfasADuq!yJnHPDFKjM7EX?a=c7N3QNdXjKvgbtVFX647gy&YG=sWAcJtb3KbqgMbXPjquSTdZJdRaF*umZ#gH2BknNpKQnta-tGKr$eRSkX4_V*_WGy6wx2TJk9bqryy!ahegca=3TAKr#jAv+XxrCML5E9+vArvuTyKjh3GerLX#FRXPPr@HJ@JRaWdwgWsWe2VA$6DnTJSu";
            hash.register(newLink,password,(err,user) => {
                if (err){
                    console.log(err);
                    createHash(res,number + 1);
                }
                else {
                    console.log(user);
                    passport.authenticate("local")(req,res,() => {
                        res.json({msg : 'YOUR HASH CREATED SUCCESSFULY',success: true,status : 200,hash : currentHash,token:jwt.getToken({_id:currentHash._id})});
                    })
                }
            })     
            .catch(err => {
                createHash(res,number + 1);

            })
        }
}


function signUp(){
    
}


