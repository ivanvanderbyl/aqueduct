import * as React from 'react';
import './apply.scss';

interface IApplyProps {

}

export class Apply extends React.Component<IApplyProps> {
  public render() {
    return (
      <div className='apply'>
        <div className='outer-container'>
          <div className='content'>
            <div className='banner'>
              <img src='./images/light-logo.svg' style={{ width: '320px' }} />
            </div>
            <div className='inner-container'>
              <h1>API Key Application</h1>
              <h2>Membership and Eligilibility</h2>
              <p>Because Aqueduct is not yet <em>entirely</em> trustless, we must ask that potential partners who wish to use it apply for an API key.  We apologize for
                this inconvenience, but believe the benefit to the decentralized trading community is worth it.  There are two classes of membership that are avilable:
                Relayers &amp; dApps, and Liquidity Providers &amp; Market Makers.  Details of each are outlined below. Note that users may use the API without participating
                in either the Fee Sharing or Rebate programs.</p>
              <h3>Relay &amp; dApp Partners</h3>
              <p>
                Relay and dApp operators may apply to be considered for acceptance into Aqueduct.  Each application will be considered on its individual merits, but
                unless there is compelling evidence that an applicant cannot be trusted, we expect that most will be approved.
              </p>
              <h4>Fee Sharing</h4>
              <p>
                Aqueduct provides a means for ERC dEX to share fees with its relay partners and provide rebates to its liquidity provider partners.
                The technology that underpins Aqueduct fee payments is based on state-channel technology that enables frequent, trustless micropayments
                between parties without incurring transaction costs on the Ethereum network. Fee splits are based on transaction volume, are denominated in ZRX token,
                and conform to the following schedule:
              </p>
              <table className='fee-table'>
                <thead>
                  <tr>
                    <th>Milestone</th>
                    <th>Volume</th>
                    <th>Fee Share</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Volume Observation</td>
                    <td>N/A (1 week)</td>
                    <td>0%</td>
                  </tr>
                  <tr>
                    <td>Level 1</td>
                    <td>$10,000</td>
                    <td>10% x makerFee</td>
                  </tr>
                  <tr>
                    <td>Level 2</td>
                    <td>$25,000</td>
                    <td>25% x makerFee</td>
                  </tr>
                  <tr>
                    <td>Level 3</td>
                    <td>$50,000</td>
                    <td>50% x makerFee</td>
                  </tr>
                  <tr>
                    <td>Level 4</td>
                    <td>$75,000</td>
                    <td>75% x makerFee</td>
                  </tr>
                  <tr>
                    <td>Level 5</td>
                    <td>$100,000+</td>
                    <td>100% x makerFee</td>
                  </tr>
                </tbody>
              </table>
              <p>
                The Observation period is necessary to determine the level of collateral needed to stake in the payment channel that will be used to pay
                fees going forward.  Volume levels are measures of volume of ERC dEX trades that the partner has filled on its relay/dApp within the past 24 hours.
              </p>
              <div className='form-wrapper'>
                <div className='relay-form'>
                  <div className='input-field'>
                    <span className='input-label'>Company Name</span>
                    <input className='input' type='text' />
                  </div>
                  <div className='input-field'>
                    <span className='input-label'>Contact Name</span>
                    <input className='input' type='text' />
                  </div>
                  <div className='input-field'>
                    <span className='input-label'>Company Email</span>
                    <input className='input' type='text' />
                  </div>
                  <div className='input-field'>
                    <span className='input-label'>Contact Phone</span>
                    <input className='input' type='text' />
                  </div>
                </div>
              </div>
              <h3>Liquidity Provider &amp; Market Maker Partners</h3>
              <p>
                We are excited to offer our market making and liquidity partners the ability to receive real-time rebates based on their historical trade volume.
                All rebates are denominated in ZRX tokens.
              </p>
              <h4>Rebates</h4>
              <p>The rebate structure is based on trade volume over the past 30 days, as outlined in the table below.</p>
              <table className='fee-table'>
                <thead>
                  <tr>
                    <th>Milestone</th>
                    <th>30-day Volume</th>
                    <th>Rebate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Level 1</td>
                    <td>&gt; 1%</td>
                    <td>0.01%</td>
                  </tr>
                  <tr>
                    <td>Level 2</td>
                    <td>&gt; 2.5%</td>
                    <td>0.04%</td>
                  </tr>
                  <tr>
                    <td>Level 3</td>
                    <td>&gt; 5%</td>
                    <td>0.06%</td>
                  </tr>
                  <tr>
                    <td>Level 4</td>
                    <td>&gt; 10%</td>
                    <td>0.08%</td>
                  </tr>
                  <tr>
                    <td>Level 5</td>
                    <td>&gt; 20%</td>
                    <td>0.1%</td>
                  </tr>
                </tbody>
              </table>
              <p>
                So, as an example, if your trade volume over the last 30 days represented 3% of all trades made and filled on ERC dEX, your next trade would
                be eligible for a rebate of 0.04% of the fees on that trade, lowering your effective fee.
              </p>
            </div>
          </div>
        </div>
      </div>

    );
  }
}
