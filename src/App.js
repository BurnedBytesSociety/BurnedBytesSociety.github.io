import './App.css';

import Web3 from 'web3';
import { useState, useEffect } from 'react';

const BurnedBytesDAOToken = require('./BurnedBytesDAOToken.json');
const BytesContract = require('./BytesContract.json');

const shortenAddress = (address) => {
  const prefix = address.substring(0, 6);
  const suffix = address.substring(address.length - 4);

  return `${prefix}...${suffix}`;
};

const BYTES_CONTRACT_ADDRESS = "0x698fbaaca64944376e2cdc4cad86eaa91362cf54";
const ADDRESS = "0x4efc1fbed6598551c30a830758244ecc9706dfb4";

function App() {

  const web3 = new Web3(Web3.givenProvider);
  const [account, setAccount] = useState('');
  const [burnedBytes, setBurnedBytes] = useState(0);

  const getAccount = async () => {
    const web3 = new Web3(Web3.givenProvider);
    const network = await web3.eth.net.getNetworkType();
    await window.ethereum.enable();
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    console.log("TCL: getData -> network", network);
    console.log("TCL: getData -> accounts", accounts);

    return accounts[0];
  };

  useEffect(() => {
    if (!account) {
      return;
    }
    const contract = new web3.eth.Contract(BytesContract, BYTES_CONTRACT_ADDRESS);

    contract.methods.bytesBurned(account).call()
      .then((result) => {
        if (result) {
          setBurnedBytes(result);
        }
      });

  }, [account]);

  const addToken = async () => {
    const account = await getAccount();
    const tokenAddress = '0x4efc1fbed6598551c30a830758244ecc9706dfb4';
    const tokenSymbol = 'BITS';
    const tokenDecimals = 18;
    const tokenImage = 'https://i.ibb.co/nDtbQhP/Coin-Burn-icon-Cryptocurrency-related-vector-illustration.jpg';

    const wasAdded = await window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20', // Initially only supports ERC20, but eventually more!
        options: {
          address: tokenAddress, // The address that the token is at.
          symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
          decimals: tokenDecimals, // The number of decimals in the token
          image: tokenImage, // A string url of the token logo
        },
      },
    });
  };

  const handleClaim = async (e) => {
    e.preventDefault();
    const account = await getAccount();

    const contract = new web3.eth.Contract(BurnedBytesDAOToken, ADDRESS);

    contract.methods.claim().send({from: account})
      .on('receipt', function(){
          console.log('done');
      });
  };


  return (
    <div id="app" data-v-app="">
        <div align="center" justify="center" vertical="" className="home" data-v-057136a0="">
          <div className="home-banner" id="topBanner" data-v-53c8782e="" data-v-057136a0="" style={{"backgroundPosition": "center 0%"}}>
              <div className="home-top-box-container" data-v-53c8782e="">
                <div className="home-top-box" data-v-53c8782e="">
                    <div className="home-top-content" data-v-53c8782e="">
                      <div className="home-top-title" data-v-53c8782e=""><span data-v-53c8782e="">Burned Bytes Society</span></div>
                      <div className="home-top-desc" data-v-53c8782e=""><span data-v-53c8782e="">Introducing the Burned Bytes Society, a token formed from the ashes of all the $BYTES that were burned. Burned $BYTES were divided into 1000 $BITS which you can claim. Make sure to read the contract code first.</span></div>
                      <div className="button-Jump" data-v-53c8782e="">
                          <a href="#claim" className="home-top-button-box mt50" data-v-53c8782e="">
                            <div className="home-top-button" data-v-53c8782e="">Initiate Claim</div>
                          </a>
                      </div>
                      <div className="offical-link mt60" data-v-53c8782e="">
                          <div className="offical-link-item" data-v-53c8782e=""><a target="_blank" href="https://www.dextools.io/app/ether/pair-explorer/0xed7bfb3ecabc920b98b55c60976b021b734008c5" data-v-53c8782e=""><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAAAXNSR0IArs4c6QAAAvVJREFUaEPVmUvoTVEUh79/3sojMpABykCRUoQyUEopA0J5M/FKxECeA6LIxCMRkoQ8yoAookTeEaVIKQMUSSITr+hX++i4zrlnr333Ofda47XX+u66a6+91jpt/IfS1mTmlcBEYBnwwpelmdB7gOUOdBOwuZWhuwFHgKkpyDHA3VaFHgCcA4alAA8AS3yBpVdleiiaV4GuKcDPQB/gWytCLwQOZoBtB9ZZgKuK9A5gdQbYR2Ag8KmVoLsD+4DZOVCLc6Jf+BvKyun+wAVgaA6BotyrkC5HoQzoUcA1oEsdqAXA0VaBXgSohNWTp8CQUODYFzHvwtXyzQRONRtaabAfmO8B8hAY4aFXV6XRnO4LnDeAjAbuNRNaT/ENoIcnxANgpKduKZFWr7AXaGeA0I98YtDPVQ1Jj63ABqPzQ4AqSxSxQHd2L9hco+efwHTXenYynG0PfAVe1Z7xhVYndhkYbnCaqAr6HaA+2pJOHYAfwM7af9YHWqBXgN4BwDGO3ALGpg0VQav2HjZGKAZoYuOiq/8ffKE3AltiEhht7QJWZZ3JirTyTnmUDJ1GX1HUNeRq2M2ULOgz7rZH8R5gZBpwtt65LGiNQGsCnP0CvgAdAUtpS1y9ByYAj4t8513EQa4fVsnxle+AepFLNcOrz/mbgLq/1z7KRdXDx0ZaR7OgWlSLHAdMD1ZM6J7uEVF6+Ipps5QYjQl9EpjhSwsUXjhL9TD4/aPazzcf3b8xCVCrGiSxIn0CmOVBoCdZF+6fJsjj7B+VGNBq7O97OD1tTJ9ckzGgtZ8bXwAdtP4qK6c1890pAJ4DKH2iSaORfgYMzqF563bQt6PROkONQI9zm6QsJkVf08qb2MCy1wi0htSsXZ2aHdXg0iQUegWwO4NqG7C+NNoG00OTRO3Wcx5wrGzg0PTQcKAvU4lobTsFuF4FcAi0PvQ8dz2zzj9yFeJlVcAh0Evddl9ntTSfDGhFUKlYL6IirQuo+ry2UtKUMyt0szj/8vsbjMZsLoQPfB8AAAAASUVORK5CYII=" alt="" data-v-53c8782e=""/></a></div>
                          <div className="offical-link-item" data-v-53c8782e=""><a target="_blank" href="https://twitter.com/burnedbytes" data-v-53c8782e=""><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAAAXNSR0IArs4c6QAAA7dJREFUaEPtmVmIT1Ecxz9jlyVrlpAHe5QtIiRky5KlFGUJIUIeSCkeJEse7JFsESmyFA+yPigxiuySrWQP2Sn6Tufm7/7vPffcZaaZmlPzMPPbvud3f+e3TQFl8BSUQcyUgy6pr1aSnq4OTALGAV2BhsAH4C5wCtgJvLJcvDLwS3Q/6DZAA+Byxl4bCOwCWlj0fgFWAOuBPzl8NYEZQB1DzwO91XiiB/A0I+Dy7j6ggqO+/cA8oDcwGpgA1AI6ma+SB/ol0Ai4DfQH3joaCmPrC5wHKqbUsxZY4unIDY9mwPMc5YXAMOBNQoNVzOVbJZT3xM4Cw0086y0U5oLuDlz1GbgPjAXuJDA8ETiQQC5X5AywG1C4jgJW6vdc0CJcCTDyGZgCHI0JQPxjYsrY2HcAs/zZoyXw2CKlB7IoRri8B+pmBPqkSRCBKe8dUM9iSHR9ou3ANwtftQh6nLso88wEfgY9RP1N8TPVQaOyzBZgr+/xeqIqHK8d9ESxnDBp7z8+f3EJeow2xSoCF4HTwCXgGvAbqAp8jZGbw2zIKXlODCrjYpwc5YIQumLuGfAEUI5W2ktzNgIL/ApyQeuTKlNUMmW8YxprGcmuBpbaQA8weVVxfQNYBzTPyHhSNQuBDTbQbYF7SbUXk5wKitJd6ENUqOjFq8srLUdd50MbaNFUdZQTS8NRTQh0oD97dABuZtCVZXFphYXCI+8Epbw1wOIsrKbUMdtUXifQyq3HgaEpjaYRV9FSq/zC1dPiU++wzbGkpwEXJquWdHAYMWqwHQQsM9XNdVzK4hLjgSNxQaulVJHRuKX5TCW5SRZoHHQ8AtqZHiaQ3eZpzXaaE0v6TAP22IzaQPcqhlVClANuAV1sXpaCqJheFdSwRFlOSFfG6OPiqCjQGv3V7BfNZsV8NgHzXWxEgfZ0TAdUdOq7KE3Ac90sZ364yLqCli6tp7QWGAK0Nz8uNqJ41KT1NINDFG8RPQ5oT6H2cYcAPdS055NJp+p3nE8c0Np6zjVLwBrOFsIZVQNGhOxarOpdQDc15XyO6QcywIsKiFZueb2yi3IPtIqIpmjtFmqbMUszYj+gW8IwCrN/EJADProADOLxQCtONwMjkypykNPqWC3vYQfeWOEhzy4HNORmddReajhVHrZtpZzthcV0ZxPHWmg3dtb2j1HgzpkN1DHv3w4J9ASKRD1E0XUBdXmK7dbmXxDK2eq5tUVS2tIO+4FZCWuvfQH4nhVIv54o0MVlN5XectCp3BdDuEx6+i98yJgusKwTHQAAAABJRU5ErkJggg==" alt="" data-v-53c8782e=""/></a></div>
                          <div className="offical-link-item" data-v-53c8782e=""><a target="_blank" href="https://discord.gg/Fvbs3sZUhM" data-v-53c8782e=""><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAAAXNSR0IArs4c6QAAA3BJREFUaEPt2VnobWMYBvDfQUhCZi4MGZOMScgUSRG5EE6S0yE33EgZwg2iZChFmefMQ4hSZLgRF0hEhgvzkIQohJ7Tt0/bZ+2911pn7//Zp/7v5Vrv937P93zveqe1xBooSxowr4NzcSZ2x3qr6Vy/4x3cjPuGMdSg18UzOGY1AR217Z04C/9EoQZ9Ka6YM8ADOMtwdxPoz7DDnIJ+Cwc0gV5B/5zKn4j7/s895hn0Sry1Ty+CnoGbrSB5kekZMFubnBrTyVyv4nMcPSZkfoznsQcOwgY9DrnKoD/BNfgRZ2BHvI9v8St+wl/YBNtjN2yKR3EXDsbF5RBt8fcGnQhzGZ7D6fgUT+PLFjsnzoblY8vhbi/p+Vqk5pkkvUE/jOWFvTDbV9bHgXgdN5YibZKt3qD3xruTrHd8H/eJu609YV0v0GHl0I6A2qo/gZNmAXplpdUWSQe94/DstEEnEmxVokUHLK1V85F+j43GrOjsHi/hqBEGd8bJZdN78Uell48ukWYL5ENOxGmSB3HaNEEnzF3ZYDDxN7XuhuXdUw2+maSSMBf5GfsgtXst6U5umybow0vmq21ejYuqh9vi6/JsJyQbDsvlIzqkXfHhNEFvNsKf056lTRuWLYur5Fk6oZrVS5DD1rIWfhvTTHfy6XwgAdIkAfUmNi8v7yhZblj3IZxSHnyD/YZuoraZDnyvEXt1Av029h1zbdvgBHxV0vvflW6SxvHl4PH5kDBKEvYS/pqkE+hXcERlJWzlMDXAMXj+8yoh7hC8XC0YF0E6gX4Nh1XGE+ZSM7yIB/BDS7QbY2nprC9sYH1qTAdPPrarKmCpiS/A2XivRJew/wV+KbqJ0dsVP00JkDW34rHB8KXopcq7HueNOXwnpgd2HsH5DWVo6ul7WjKdJBTAw3IkUp7uP8FGL9CxmflDRmcv4IOSVJ5EGG0jaRDOKWFtz5J00s20kd6g2xiflc4i6FkxW9tdZHqR6a5x+iPsslC0lX0yiti6RYyOeqNPJ3Fct8Cgv0Nq7vtxYp/kkmosi09dYOApnN7ADX3S+OAKkmpT1KST6DNz63rmm4ZuOA1CXeMM7DW6R9fNZqWfUUWKqnpUNtegQ0YmsBlWZoC5RjA9AJmfrynOUruPjB6zuu5VsZuG+nFkGjD37jF80LRmt5RprX8BOZ+oLtrzV8cAAAAASUVORK5CYII=" alt="" data-v-53c8782e=""/></a></div>
                          <div className="offical-link-item" data-v-53c8782e=""><a target="_blank" href="https://etherscan.io/address/0x4efc1fbed6598551c30a830758244ecc9706dfb4#code" data-v-53c8782e=""><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAAAXNSR0IArs4c6QAABBdJREFUaEPVmWmoTVEUx3/PHMIH81xkTjJmlmTOlGRIyFAklBAiRULCB8mUMUPJlPiiTBnLWHwwFUXmqUyZ+7/2vR37nfGee967b3+5dc7e6/zuOmuv/V/r5FEMR14xZCYb0JWBXkAPoCXQCKgGVAS+A1+Bp8AD4BpwBrgbx1mZQmvdIGAyMBAoExHiMbAT2A68irg2I08LdgXQJurDXObrTWwy9j6EtRfF0zWBLcCQsMYjzHsNzAQOhVkTFro3sB+oEcZojDlyyizgh5+NMNCjgT1A6RgwUZZqo44APnktCoIeC+yL8sQszb0I9DOZp4BJP+g+wKlC9LANdxwYDvy1b3hB1wZum3ybJeelzQjiIfDNXCkFNAX0a4/FwMqw0CdN/s02sOzJe8csw0qf14GS1vVfQHvgjvO6m6dl9EgStMamwP642H8CNHC5fgno7gwTG7qEOWKbJwjtFZJe0EIZBijG84dtQKnmcExg6YuXDht1zCv2embquh/0FaCLlwFliwExoHcYPWKbOAAo37s5Kgy05rQC7tkGqhoP2Zshyn+QgBK4PeYA62NCrwIW2tDyhDwSZ0wCdiUEfQtoa0NLbU0PIL4B6LRKDb2VoUA9cyFJaKXhwTb0eSPkvbjfGjjJSedo7cijSUGfAEamhJQze7wAJD+9hhK8l4ZOHbVJQB81mzit/JzQ8mDZHINWyEqq/nZyOaELCBPrDxSmpwU5H1hn7Z98+FyE1t4ZBZx1AOuk3guMs6G/AOWLODyk/iYCzx0ccqzCZEKKz+np+0CTIoQeAxy09LP4NgIzANWR+eWeE1pyUTm3qLKH/VydAfLwNHND0rWDDS3BrdZALkArTFXmSd2lxm4TOv95ujNwOQegpQql5ztaLGld4wwP7dBnQC0P8LgpT3G5wbxyL99I7Kv3YbcqlI7rG74CenoNMC8BaCnI9x4Vix6n+F0ELAPkPHucBvqmLtpFQEPgkUutpvlxPO0TdTQzyrCTzyTfykXrtgJTXQz4QavqOAesjdARlWRYYDzsJx9umsonfWK71WsSTcrZlSxwP2g/T7rdU1m3GmgcsFCg3ewE4VVkKkyqGIOfTTyqqxmkT4Lg+wNLnPVewAJpj7n2nKC2WBBEmPtqwqgtoYf7xa1t6wKgLtfPwoTW25JeUH5NVTZh/qTm6EuBOrVv3BZk29PKpZICUmldXVoUYaBV0qkj4AosA3GhdRBpowhQeTRuk0eCSW9G32k8RxRozdXrbmfUoEqv6mFcF2KONvlso5kDp0eBljFBLjXeKBdoPXiCOqebgeVAIt9cnAjSBlOA8aZNG4z3/wxtNKm4bcC7qIujetrNfgugp1Flium65htiBUDV0EfzHVFVyVVzckoqZDyyAZ3xwzNdWCyh/wGpueUuo/Y+vQAAAABJRU5ErkJggg==" alt="" data-v-53c8782e=""/></a></div>
                          <div className="offical-link-item" data-v-53c8782e=""><a target="_blank" href="https://verdant-kangaroo-4bc.notion.site/Burned-Bytes-Society-8b803f19bafe45d9b10a4ddbb9645549" data-v-53c8782e=""><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAAAXNSR0IArs4c6QAABClJREFUaEPVmVvoT1kUxz9/90vuZGZCvEjukpIH41Z4oEwyIoknuTyQokQRLxQPijxgkuSSwgslIZrMpHFJbpOiSTEujeu40/fX2trt9vn99u/2d+w6/U7nrL3W5+zf3muvtXYD32FrqAFza6Az0AXo5t27Z13tnd67Zx2AZsAj4AiwFrifyhKDFsQgD0AgvkEZFogu3Uu+2vYMWAzsTVEUQk8E9gMdUzqXkBHIY+CpXU/sV6P7HJDtAcBMoK3pOgAsAP4rpjuEvgX0DTq88QzLoDMuGN3rcnD+uw+JH/4TsAcYb/L/AHOAs1n9Q+hPNgKS/xOYALxINF6NWBNgBbDO5vpnYCOwGngfKg6hJey3XcBC4G01RGX0HQnsA/pYn0vALOCmr6MUtBvxX8pZ3WVAOtFWto7kVXoBB7119T+wFNjhhFOgJfsQmAccjwBJh4xp8epy97HfrHctEj50C7BMcqnQTudd+wCtdgfQLsFgLUS0sJtXAl0L46EOrRe5x/CSW9RUGed1KAxyuSOdatAHkM+NQblnxRa5vIp2yh/McEXQJ21e/WsgjeFVLgNDqoGeARyqxxwporNq6GkW4DQmd92hmwKd7FIwpU1Bczds/YGVFpTJC/mX4p/fvQ41h5Z/3Q2MskgwdH+KKeZGoOXvJwXPbwOngOXA63pCa1ROlJgrkyMy2oR6ApsA6VAbC5yJ6Kr5SLcxX6rAamsGvKK2gRaOhiK/ef9Eo0E7iDHA6SIjvg1YFHmfa2jxjgbOBeC5gVbS0DKy2/4NDAb03rXcQN8DjgFLItNBgb2C/VxCKzG+DvQIwD8CCvQv2vNcjXRvYCpwNDLaV4ARlkblDlq8hwFlPWFT7rceyCX0j7aVtw+o3wFDbX67HfOb+mktRE0P11TH2B4Z7QuAPIrKBWq5glbgft7ik5Bd5QkXr+QKWqCK6hRDFHK8jJY7aHGqEKMFWHNo+VHlZVktKwnwY49wTjtd2iWvRspu7n3FI61SmHxoPaCl8+eM8LOqhagcUJXLaqBVhJxutUA/mHc6dwLzIwYqHmnpUtwwJYM6nB5Kr+RnVW9zVU/XVVNNcXYY2Mtn/wH082yohqjsR24wbCWTAHVQjvdX4GudohBaW7Uq+WFdQ7UOlWo3A2FRU7q6A6sse7lhO6PSrVhLglbH4ZZchjW2EFqLVuXherZrVnyXjWixxjce28kau4SgKPEO4AavJLQ+QGcgs70v0QJS9l1Jc0VLv1yg+R2WEFxhU9N0mLdjZhYgQxgZkhvUjqamebfBzkSU1IYGfQhX9nUyxfx/yiDoaKWweFOO5CSooN0d5qQYqLXMK/vHC/F5CrTkfrVTr1rB6BxFHsdVVPXr3/vvHpiL/HrilQotWB2drQF0GqX20gxlGSsGFNt0kgekHOhkpfUW/C6hvwCc3Uo9mldf5gAAAABJRU5ErkJggg==" alt="" data-v-53c8782e="" /></a></div>
                          <div className="offical-link-item" data-v-53c8782e=""></div>
                      </div>
                    </div>
                </div>
              </div>
          </div>
          <div show="false" data-v-532ffc42="" data-v-057136a0="">
              <div className="el-overlay" style={{"zIndex": 2001, "display": "none"}}>
                <div className="el-overlay-dialog">
                    <div className="el-dialog el-dialog--center" aria-modal="true" role="dialog" aria-label="dialog">
                      <div className="el-dialog__header">
                          <span className="el-dialog__title"></span>
                          <button aria-label="close" className="el-dialog__headerbtn" type="button">
                            <i className="el-icon el-dialog__close">
                                <svg className="icon" width="200" height="200" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                                  <path fill="currentColor" d="M764.288 214.592L512 466.88 259.712 214.592a31.936 31.936 0 00-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1045.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0045.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 10-45.12-45.184z"></path>
                                </svg>
                            </i>
                          </button>
                      </div>
                    </div>
                </div>
              </div>
              <div className="el-overlay" style={{"zIndex": 2002, "display": "none"}}>
                <div className="el-overlay-dialog">
                    <div className="el-dialog el-dialog--center" aria-modal="true" role="dialog" aria-label="dialog" >
                      <div className="el-dialog__header">
                          <span className="el-dialog__title"></span>
                          <button aria-label="close" className="el-dialog__headerbtn" type="button">
                            <i className="el-icon el-dialog__close">
                                <svg className="icon" width="200" height="200" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                                  <path fill="currentColor" d="M764.288 214.592L512 466.88 259.712 214.592a31.936 31.936 0 00-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1045.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0045.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 10-45.12-45.184z"></path>
                                </svg>
                            </i>
                          </button>
                      </div>
                    </div>
                </div>
              </div>
              <div className="claim-middle" id="claim" data-v-532ffc42="">
                <div className="claim-middle-title" data-v-532ffc42=""> CLAIM <span data-v-532ffc42="">CLAIM</span></div>
                <div className="claim-content" justify="center" data-v-532ffc42="">
                    <div className="steps-box" data-v-532ffc42="">
                      <div data-v-532ffc42="">
                          <div className="steps-title" data-v-532ffc42=""><span data-v-532ffc42="">STEP &nbsp;&nbsp; 1</span></div>
                          <div className="steps-topic-title" data-v-532ffc42="">CONNECT YOUR WALLET</div>
                          <div className="connect" data-v-de4935f8="" data-v-532ffc42="">
                            <div data-v-de4935f8="">
                                {!account ? <div onClick={getAccount} className="button-format" data-v-532ffc42="">Connect</div>
                                : <div className="address" data-v-de4935f8="">{account ? shortenAddress(account) : ''}</div>}
                            </div>
                          </div>
                          <div data-v-532ffc42=""></div>
                          {burnedBytes > 0 ? <div className="mt10" data-v-532ffc42="" style={{"height": "22.4px"}}><span className="steps-wallet-status success" data-v-532ffc42="">You are eligible for the airdrop!</span></div> : <div className="mt10" data-v-532ffc42="" style={{"height": "22.4px", "color": "red"}}><span className="steps-wallet-status success" data-v-532ffc42="">You are not eligible for the airdrop!</span></div>}
                      </div>
                    </div>
                    <div className="steps-box-estimate" data-v-303a526f="" data-v-532ffc42="">
                      <div className="steps-title" data-v-303a526f=""><span data-v-303a526f="">STEP &nbsp;&nbsp; 2</span></div>
                      <div data-v-303a526f="">
                          <div className="steps-topic-title" data-v-303a526f=""> ESTIMATE YOUR REWARD </div>
                          <div className="mt20 steps-info" data-v-303a526f="">
                            <div className="reword-left" data-v-303a526f="">
                                <div className="estimate-title" data-v-303a526f=""><span data-v-303a526f="">Bytes Burned</span></div>
                                <div className="estimate-line" data-v-303a526f="">
                                  <div className="estimate-reward" data-v-303a526f=""><span data-v-303a526f="">Bytes</span></div>
                                  <div className="estimate-price" data-v-303a526f=""><span data-v-303a526f="">{burnedBytes}</span></div>
                                </div>
                                <div className="estimate-line" data-v-303a526f="">
                                  <div className="estimate-reward" data-v-303a526f=""><span data-v-303a526f="">Multiplier</span></div>
                                  <div className="estimate-price" data-v-303a526f=""><span data-v-303a526f="">1000</span></div>
                                </div>
                                <div data-v-303a526f=""></div>
                                <div className="estimate-line" data-v-303a526f="">
                                  <div className="estimate-reward" data-v-303a526f=""><span data-v-303a526f="">Sub-Total</span></div>
                                  <div className="estimate-price" data-v-303a526f=""><span data-v-303a526f="">{(burnedBytes*1000).toFixed(2)}</span><img className="estimate-price-img" alt="logo" src="/burnedbytes.jpg" data-v-303a526f=""/></div>
                                </div>
                            </div>
                            <div className="reword-right" data-v-303a526f="">
                            </div>
                          </div>
                      </div>
                      <div className="estimate-cliam-totla" data-v-303a526f="">
                          <div className="estimate-reward-total" data-v-303a526f=""><span data-v-303a526f="">$BITS reward</span></div>
                          <div className="estimate-price-total" data-v-303a526f=""><span data-v-303a526f="">{(burnedBytes*1000).toFixed(2)}</span><img className="estimate-price-img" src="./burnedbytes.jpg" data-v-303a526f=""/></div>
                      </div>
                    </div>
                    <div className="steps-box" data-v-532ffc42="">
                      <div className="steps-title" data-v-532ffc42=""><span data-v-532ffc42="">STEP &nbsp;&nbsp; 3</span></div>
                      <div className="steps-cliamAirDrop" data-v-532ffc42="">
                          <div className="steps-topic-title" data-v-532ffc42="">INITIATE YOUR CLAIM</div>
                          <div className="flex-between" data-v-532ffc42="">
                            <div onClick={handleClaim} className="button-format" data-v-532ffc42="">Claim</div>
                            <div onClick={addToken} className="Add-token" data-v-532ffc42="">Add $BITS</div>
                          </div>
                      </div>
                    </div>
                </div>
              </div>
          </div>
          <div className="dis-container" data-v-4e1d616e="" data-v-057136a0="">
              <div className="dis-title" data-v-4e1d616e=""> DISTRIBUTION <span data-v-4e1d616e="">DISTRIBUTION</span></div>
              <div className="dis-desc" data-v-4e1d616e=""><span data-v-4e1d616e="">$BITS is grateful to all neo tokyo citizens. To pay tribute, we have chosen those who burned $BYTES to conduct our airdrop.</span></div>
              <div className="dis-content" data-v-4e1d616e="">
                <div vertical="" className="" data-v-4e1d616e="">
                    <div data-v-4e1d616e="">
                      <div className="dis-content-title" data-v-4e1d616e="">$BITS Token Distribution</div>
                      <div className="dis-content-warning" data-v-4e1d616e="">The $BITS contract is 0x4efc1fbed6598551c30a830758244ecc9706dfb4 Double check the website URL and contract address to avoid scams. Don't trust anyone. Read the contract code first before claiming.</div>
                      <div className="dis-content-sub-title" data-v-4e1d616e="">There will be 400,000,000 total $BITS tokens, and the distribution is as follows</div>
                      <ul className="dis-content-list" data-v-4e1d616e="">
                          <li data-v-4e1d616e=""><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAPCAYAAADUFP50AAAAAXNSR0IArs4c6QAAAMZJREFUOE+N0jkOwjAQheE/BQgOxlYAgQIJOB9ih9Cz3IoKEHrSWHKMneAyni/PY09GenWAF/CIlWQJJ3QBPsAwhmOwCxRA2376NHz3Q0LYA84ecrXCI+DmPvhQSEmtxPFL2MG+JaWQnzwGroID4FSRFB5AybngFphVPEtsayXYBHaAjvDPOgJz12PDcF4jD0IaDP9W6/AeWNg0Eb6jsHqeBMklpL3Y5AhvgKlh9b90SbEB8EOE11Ys9A57Tw256oQ15D9Im1/asif+Y/atnAAAAABJRU5ErkJggg==" alt="" data-v-4e1d616e="" />25% $BITS treasury </li>
                          <li data-v-4e1d616e=""><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAPCAYAAADUFP50AAAAAXNSR0IArs4c6QAAAMZJREFUOE+N0jkOwjAQheE/BQgOxlYAgQIJOB9ih9Cz3IoKEHrSWHKMneAyni/PY09GenWAF/CIlWQJJ3QBPsAwhmOwCxRA2376NHz3Q0LYA84ecrXCI+DmPvhQSEmtxPFL2MG+JaWQnzwGroID4FSRFB5AybngFphVPEtsayXYBHaAjvDPOgJz12PDcF4jD0IaDP9W6/AeWNg0Eb6jsHqeBMklpL3Y5AhvgKlh9b90SbEB8EOE11Ys9A57Tw256oQ15D9Im1/asif+Y/atnAAAAABJRU5ErkJggg==" alt="" data-v-4e1d616e="" />10% Liquidity Pool incentives </li>
                          <li data-v-4e1d616e=""><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAPCAYAAADUFP50AAAAAXNSR0IArs4c6QAAAMZJREFUOE+N0jkOwjAQheE/BQgOxlYAgQIJOB9ih9Cz3IoKEHrSWHKMneAyni/PY09GenWAF/CIlWQJJ3QBPsAwhmOwCxRA2376NHz3Q0LYA84ecrXCI+DmPvhQSEmtxPFL2MG+JaWQnzwGroID4FSRFB5AybngFphVPEtsayXYBHaAjvDPOgJz12PDcF4jD0IaDP9W6/AeWNg0Eb6jsHqeBMklpL3Y5AhvgKlh9b90SbEB8EOE11Ys9A57Tw256oQ15D9Im1/asif+Y/atnAAAAABJRU5ErkJggg==" alt="" data-v-4e1d616e="" />65% Claimable by $Bytes Burner </li>
                      </ul>
                    </div>
                </div>
              </div>
              <p className="copy-right" data-v-51dfc78c="">© 2021 by Burned Bytes Society</p>
          </div>
          <div className="home-logo" data-v-057136a0="">
              <div className="connect" data-v-de4935f8="" data-v-057136a0="">
                <div data-v-de4935f8="">
                    <div onClick={getAccount} className="connect-top" data-v-de4935f8=""><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAAXNSR0IArs4c6QAAAxJJREFUSEu1ls1rVFcUwH/nzkzUmKI1YMxWNBY33QTyoklsiho3grqIIEKl9j9oBTNj6VvMhyLiRqQgWlH8AJV2UWiCBjRqJqGzqkgTolDQjRIXtpnESTP3yM1LMo4TJZOMd/feO/f8zjnvfAkfOoowkNyCSAdKI8IGlHWoViMIaBaRF6iMoGQQ7cGL9iPofCql5KXvG3ZFDqHSNa28nKM8QUjS1HURkSJgMagvWk/4s+sYbStHf4msyj2ydj/bYy9mvxVAfafrqZp4AKxfEmTusowwZltnYQFIfUN62V2MtlYGMqPFedaT+xrftwFoMPEdKucqCplTpofxYhdcjgiDySeVC9l75roE8aINDtKK0rdkb5Rx4CUwBhpCZDVKHYJBaRHS8QRioosCKUOgZxHbjfeji0pxDWX8anLLPMI6IfSnejC6s2yQ6ine/H+Udn9qIXdd9T8t//+Y3/CO7i0CpFNfobQith6R5cA4lueE7B2ajmWEdDKLUL0QqwqJRAvN0Ydzz+nEZUQOolwlkusiF6ojFLkMuikoHxN3Hs3bmz4Kfh2poeNIdlqm21/DqqpRkByjuVp2+y4poP/EHkz+1wDEv4sDrYjU8OUM6H7qc8L6CpVJ/gvXzhmQPrEPyd8KQPJaGEi5dFxZVujydhtbjxVKYiB1HvRbLDcx+SgaWgtcLDRl89PikkH5nebo7iLjBpPNWG0jJG6ULAcZB3mO2l682F8O1A10lOVREPczPJv8nk5/ciF3hXQqjmhsIcIlMspTlJ8JT/3BP4+G6LyRL5LJHF9FHg9rx4SBeAuY+4sCFV+aRGUUIYuqmW5BaO20iLVbZ5pqahh0YwVg86iQYbyuL4IxkU4cQuSXTwIS/Yam2KWZwacuzXsR2isKU3rxojvcwlIY5XcSddSIq42GysDkbyYibbT/MOr0FS8nD0+uxUxdQXT7kmDKbd5UHZiFlIKC+hD+TB3AqptRm8sDymOsTbIldu392VS6172reTDeiDW7UGnEaLBAiqxArUGMa10vQUbIa4aw7Xbj4EOGvQVDGilinkQfWAAAAABJRU5ErkJggg==" alt="" data-v-de4935f8=""/><span className="connect-style" data-v-de4935f8="">{account ? shortenAddress(account) : 'connect wallet'}</span></div>
                </div>
              </div>
          </div>
        </div>
    </div>
  );
}

export default App;
