pragma solidity >=0.4.22 <0.9.0;

import "openzeppelin-solidity/contracts/access/Ownable.sol";
import "openzeppelin-solidity/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "openzeppelin-solidity/contracts/utils/Address.sol";

library SafeMath {
    /**
     * @dev Returns the addition of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `+` operator.
     *
     * Requirements:
     *
     * - Addition cannot overflow.
     */
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");

        return c;
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     *
     * - Subtraction cannot overflow.
     */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return sub(a, b, "SafeMath: subtraction overflow");
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting with custom message on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     *
     * - Subtraction cannot overflow.
     */
    function sub(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b <= a, errorMessage);
        uint256 c = a - b;

        return c;
    }

    /**
     * @dev Returns the multiplication of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `*` operator.
     *
     * Requirements:
     *
     * - Multiplication cannot overflow.
     */
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
        // benefit is lost if 'b' is also tested.
        // See: https://github.com/OpenZeppelin/openzeppelin-contracts/pull/522
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");

        return c;
    }

    /**
     * @dev Returns the integer division of two unsigned integers. Reverts on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return div(a, b, "SafeMath: division by zero");
    }

    /**
     * @dev Returns the integer division of two unsigned integers. Reverts with custom message on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function div(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b > 0, errorMessage);
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold

        return c;
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * Reverts when dividing by zero.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        return mod(a, b, "SafeMath: modulo by zero");
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * Reverts with custom message when dividing by zero.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function mod(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b != 0, errorMessage);
        return a % b;
    }
}

contract PAWS_PAWZ_SWAP_LaunchPad is Ownable {
    using SafeMath for uint256;
    using Address for address;

    IERC20Metadata public _PAWS_Contract;
    IERC20Metadata public _PAWZ_Contract;

    mapping (address=>uint256) public _Mapping_PAWS_Deposite;
    bool public _ClaimEnabled = false;

    function setTokenContracts(address PAWS_Address, address PAWZ_Address) external onlyOwner {
        _PAWS_Contract = IERC20Metadata(PAWS_Address);        
        _PAWZ_Contract = IERC20Metadata(PAWZ_Address);        
    }
    function setEnableClaim(bool _Enabled) external onlyOwner {
        _ClaimEnabled = _Enabled;
    }
    function withdrawTokensToAdmin() external onlyOwner{
        _PAWS_Contract.transfer(_msgSender(), _PAWS_Contract.balanceOf(address(this)));
        _PAWZ_Contract.transfer(_msgSender(), _PAWZ_Contract.balanceOf(address(this)));
    }
    
    function depositePAWS() external {
        uint256 senderBalance = _PAWS_Contract.balanceOf(_msgSender());
        require(senderBalance > 0, "PAWS Balance is empty.");

        _PAWS_Contract.transferFrom(_msgSender(), address(this), senderBalance);
        _Mapping_PAWS_Deposite[_msgSender()] = _Mapping_PAWS_Deposite[_msgSender()] + senderBalance;
    }
    function claimPAWZ() external{
        require(_ClaimEnabled == true, "Claim is disabled");
        require(_Mapping_PAWS_Deposite[_msgSender()] > 0, "PAWS Deposite Amount is empty.");

        uint256 PAWS_Deposite_Amount = _Mapping_PAWS_Deposite[_msgSender()];
        uint256 PAWZ_Claim_Amount = PAWS_Deposite_Amount.div(10**6).mul((uint256)(_PAWZ_Contract.decimals())).div((uint256)(_PAWS_Contract.decimals()));
        _PAWZ_Contract.transfer(_msgSender(), PAWZ_Claim_Amount);
        _Mapping_PAWS_Deposite[_msgSender()] = 0;
    }
}