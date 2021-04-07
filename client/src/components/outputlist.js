import React from 'react';

export const OutputList = ({ data }) => {
  if (!data.length) {
    return (
      <div className="center" style={{ padding: '1rem' }}>
        No data from server, try later.
      </div>
    );
  }

  return (
    <>
      <table>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={index}>
                <td>
                  <div className="outputItem">
                    <h4>{item.title}</h4>
                    <p>published: {item.published}</p>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.url}
                    </a>
                    <h5>Source: {item.source}</h5>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
